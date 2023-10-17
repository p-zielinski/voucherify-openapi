import dotenv from "dotenv";
import minimist from "minimist";
import colors from "colors";
import { exec } from "child_process";

dotenv.config();
const options = minimist(process.argv.slice(2));
const versionTag = options.versionTag || options.vt;
const versionOption = options.version || options.v;
const { create, update } = options;
const help = options.help || options.h;
const mainVersion = "v2018-08-01";
const version =
  versionOption || versionTag ? `${mainVersion}-${versionTag}` : undefined;

const listOfGuideCategories = [
  "Getting started",
  "Development",
  "Building blocks",
  "Campaigns Recipes",
  "Discounts Recipes",
  "Distributions Recipes",
  "More",
];

const listOfReferenceCategories = ["Introduction"];

const main = async ({
  help,
  version,
  create,
  update,
}: {
  help?: boolean;
  version?: string;
  create?: boolean;
  update?: boolean;
}) => {
  const valid = validateOptions({ help, version, create, update });
  if (!valid) {
    return;
  }
  if (create) {
    await createNewVersion(version);
  }
  await cleanProject(version);
  await uploadOpenApiFile(version);
  await buildMdTables();
  await updateMdTablesInDocs();
  await uploadGuideFiles(version);
  await uploadReferenceDocsWithMaxNumberOfAttempts(version);
  console.log(
    colors.green(`\n\nDONE!\nVisit: https://docs.voucherify.io/${version}/`)
  );
};

const uploadReferenceDocsWithMaxNumberOfAttempts = async (
  version,
  maxNumberOfUploadingAttempts = 6,
  timeoutAfterEachFail = 5000
) => {
  console.log(colors.green("UPLOADING REFERENCE DOC FILES..."));
  for (let i = 1; i <= maxNumberOfUploadingAttempts; i++) {
    const success = await updateReferenceDocs(version);
    if (success) {
      console.log(colors.green("REFERENCE DOC FILES WERE UPLOADED!"));
      break;
    }
    if (i === maxNumberOfUploadingAttempts) {
      throw new Error("REFERENCE DOC WERE NOT UPLOADED!");
    }
    await new Promise((r) => setTimeout(r, timeoutAfterEachFail));
  }
};

const runProcess = async ({
  command,
  stdoutIncludes,
  stderrIncludes,
}: {
  command: string;
  stdoutIncludes?: string;
  stderrIncludes?: string;
}) => {
  await new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (
        (stdoutIncludes && stdout?.includes(stdoutIncludes)) ||
        (!stdoutIncludes && stdout) ||
        (stderrIncludes && stderr.includes(stderrIncludes))
      ) {
        return resolve(true);
      }
      if (stderr) {
        console.log(stderr);
      }
      throw error;
    });
  });
};
const uploadGuideFiles = async (version) => {
  console.log(colors.green("UPLOADING GUIDES DOC FILES..."));
  await new Promise((resolve) => {
    exec(
      `rdme docs ./docs/guides --version=${version}`,
      (error, stdout, stderr) => {
        if (stdout?.includes("successfully created")) {
          console.log(colors.green("GUIDES DOC FILES WERE UPLOADED!"));
          return resolve(true);
        }
        console.log(colors.red(error?.toString?.()));
        throw new Error("GUIDES DOC WERE NOT UPLOADED!");
      }
    );
  });
};

const updateMdTablesInDocs = async () => {
  console.log(colors.green("UPDATING MD TABLES IN DOCS..."));
  await new Promise((resolve) => {
    exec(`npm run update-md-tables-in-doc`, (error, stdout, stderr) => {
      if (stdout) {
        console.log(
          colors.green("MD TABLES WERE UPDATED IN DOCS SUCCESSFULLY!")
        );
        return resolve(true);
      }
      console.log(colors.red(error?.toString?.()));
      throw new Error("MD TABLES WERE NOT UPDATED IN DOCS!");
    });
  });
};
const buildMdTables = async () => {
  console.log(colors.green("BUILDING MD TABLES FROM OPEN API..."));
  await new Promise((resolve) => {
    exec(`npm run build-md-tables-from-openapi`, (error, stdout, stderr) => {
      if (stdout) {
        console.log(colors.green("MD TABLES WERE BUILDED SUCCESSFULLY!"));
        return resolve(true);
      }
      console.log(colors.red(error?.toString?.()));
      throw new Error("MD TABLES WERE NOT BUILDED!");
    });
  });
};

const uploadOpenApiFile = async (version) => {
  console.log(
    colors.green(
      "UPLOADING OPEN API FILE... PLEASE WAIT... THIS MAY TAKE UP TO A MINUTE"
    )
  );
  await new Promise((resolve) => {
    exec(
      `rdme openapi ./reference/OpenAPI.json --version=${version} --create`,
      (error, stdout, stderr) => {
        if (
          error
            ?.toString?.()
            ?.includes?.(
              `We're sorry, your upload request timed out. Please try again or split your file up into smaller chunks.`
            ) ||
          stdout
        ) {
          console.log(colors.green("OPEN API FILE WAS UPLOADED"));
          return resolve(true);
        }
        throw new Error(
          error?.toString?.() || "OPEN API FILE WAS NOT UPLOADED"
        );
      }
    );
  });
};

const validateOptions = ({
  help,
  version,
  create,
  update,
}: {
  help?: boolean;
  version?: string;
  create?: boolean;
  update?: boolean;
}) => {
  if (help || (!version && !create && !update)) {
    printHelp();
    return false;
  }
  if (!version) {
    console.log(
      colors.red(
        "invalid arguments, missing `version` or `versionTag`, check `help` for more information\nrun 'npm run manage-project -- --help'"
      )
    );
    return false;
  }
  if (!create && !update) {
    console.log(
      colors.red(
        "invalid arguments, missing `update` or `create`, check `help` for more information\nrun 'npm run manage-project -- --help'"
      )
    );
    return false;
  }
  if (create && update) {
    console.log(
      colors.red(
        "invalid arguments, you provided conflicting arguments `update` and `create`, check `help` for more information\nrun 'npm run manage-project -- --help'"
      )
    );
    return false;
  }
  return true;
};

const updateReferenceDocs = async (version) => {
  return await new Promise((resolve, reject) => {
    exec(
      `rdme docs ./docs/reference-docs --version=${version}`,
      (error, stdout, stderr) => {
        if (
          stderr?.includes(
            `We couldn't save this doc (Unable to find a category with the slug 'voucherify-api')`
          )
        ) {
          return resolve(false);
        }
        if (stdout?.includes("successfully created")) {
          return resolve(true);
        }
        return resolve(false);
      }
    );
  });
};

const createNewVersion = async (version) => {
  //create fork
  try {
    const response = await fetch(
      `
https://dash.readme.com/api/v1/version`,
      {
        method: "POST",
        headers: {
          authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          is_beta: false,
          is_stable: false,
          is_hidden: true,
          is_deprecated: false,
          from: mainVersion,
          version,
        }),
      }
    );
    if (response.status !== 200) {
      throw new Error(
        `Response status: ${response.status}, maybe this versionTag is already created?`
      );
    }
    console.log(colors.green(`FORK CREATED! VERSION "${version}"`));
  } catch (error) {
    console.log(colors.red(`Error while creating fork from ${mainVersion}!`)),
      error;
    throw new Error(error);
  }
};

const cleanProject = async (version) => {
  const categoriesToDelete = await getAllCategories(version);
  //delete all categories
  await asyncMap(
    categoriesToDelete,
    async (category) => await deleteCategory(version, category.slug)
  );
  console.log(colors.green(`OLD CATEGORIES DELETED!`));
  //create categories one by one (creation order is important)
  for (const categoryTitle of [
    ...listOfGuideCategories,
    ...listOfReferenceCategories,
  ]) {
    await createCategory(version, categoryTitle);
  }
  console.log(colors.green(`NEW CATEGORIES CREATED!`));
  const allCategories = await getAllCategories(version);
  //update reference categories types
  await asyncMap(
    listOfReferenceCategories,
    async (categoryTitle) =>
      await updateCategory(
        version,
        allCategories.find((category) => category.title === categoryTitle).slug,
        { type: "reference" }
      )
  );
  console.log(colors.green(`REFERENCE CATEGORIES UPDATED!`));
  const allApiSpecifications = await getAllApiSpecifications(version);
  await asyncMap(allApiSpecifications, deleteSpecification);
  console.log(colors.green(`API SPECIFICATIONS DELETED!`));
  console.log(colors.green(`VERSION "${version}" IS CLEANED UP!`));
  return;
};

const updateCategory = async (version, slug, data = {}) => {
  await fetch(`https://dash.readme.com/api/v1/categories/${slug}`, {
    method: "PUT",
    headers: {
      "x-readme-version": version,
      authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(data),
  });
};

const getAllCategories = async (version) =>
  await (
    await fetch(
      `https://dash.readme.com/api/v1/categories?perPage=100&page=1`,
      {
        method: "GET",
        headers: {
          "x-readme-version": version,
          authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
        },
      }
    )
  ).json();

const deleteCategory = async (version, slug) => {
  await fetch(`https://dash.readme.com/api/v1/categories/${slug}`, {
    method: "DELETE",
    headers: {
      "x-readme-version": version,
      authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
      accept: "application/json",
    },
  });
};

const createCategory = async (version, title) => {
  await fetch(`https://dash.readme.com/api/v1/categories`, {
    method: "POST",
    headers: {
      "x-readme-version": version,
      authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ title }),
  });
};

const getAllApiSpecifications = async (version) =>
  await (
    await fetch(
      `https://dash.readme.com/api/v1/api-specification?perPage=100&page=1`,
      {
        method: "GET",
        headers: {
          "x-readme-version": version,
          authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
        },
      }
    )
  ).json();

const deleteSpecification = async (id) => {
  await fetch(`https://dash.readme.com/api/v1/api-specification/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "Basic " + btoa(process.env.README_IO_AUTH + ":"),
      accept: "application/json",
    },
  });
};

const asyncMap = (arr, asyncFn) => {
  return Promise.all(arr.map(asyncFn));
};

const printHelp = () => {
  console.log(
    colors.green(
      `options:` +
        `\n"versionTag" or "vt" for versionTag` +
        `\n"version" or "v" for version` +
        `\n"create" if you want to create such version` +
        `\n"update" if you want to update such version` +
        `\n\nversionTag or version is required!` +
        `\ncreate or update option is required!` +
        `\n\nexamples:` +
        `\nnpm run manage-project -- --vt=piotr-123 --create` +
        `\nnpm run manage-project -- --v=v2018-08-01-piotr-123 --create` +
        `\nnpm run manage-project -- --vt=piotr-123 --update` +
        `\nnpm run manage-project -- --v=v2018-08-01-piotr-123 --update`
    )
  );
};

main({
  help,
  version,
  create,
  update,
});
