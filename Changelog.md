# Changelog

## 20230530 - Transition to Interactive documentation

### Slugs updated for Reference Docs

| **API** | **Endpoint** | **Previous Slug** | **New Slug** |
|---|---|---|---|
| **Vouchers** | Get Voucher | vouchers-get | get-voucher |
|  | Add Gift Card Balance | add-gift-voucher-balance | add-remove-gift-voucher-balance |
|  | Import Vouchers | import-vouchers-1 | import-vouchers |
|  | Import Vouchers using CSV | import-vouchers-by-csv-1 | import-vouchers-using-csv |
|  | Examine Qualification | push-qualification-request | examine-vouchers-qualification |
|  | Update Vouchers in bulk | aa-update-vouchers-in-bulk | update-vouchers-in-bulk |
|  | Update Vouchers Metadata in bulk | aaupdate-vouchers-metadata-in-bulk | update-vouchers-metadata-in-bulk |
| **Campaigns** | Add Vouchers to Campaign | add-voucher-to-campaign | add-vouchers-to-campaign |
|  | Add Voucher with certain code to Campaign | add-voucher-with-certain-code-to-campaign | add-voucher-with-specific-code-to-campaign |
|  | Import Vouchers to Campaign | import-vouchers | import-vouchers-to-campaign |
|  | Import Vouchers to Campaign by CSV | import-vouchers-by-csv | import-vouchers-to-campaign-using-csv |
|  | Examine Qualification | create-qualification-request | examine-campaigns-qualification |
| **Promotions** | List Promotion Tiers from Campaign | get-promotions | list-promotion-tiers-from-campaign |
|  | Update Promotion Tier | update-promotion | update-promotion-tier |
|  | Delete Promotion Tier | delete-promotion | delete-promotion-tier |
|  | List Promotion Stacks | list-promotion-stacks | list-promotion-stacks-in-campaign |
| **Validations** | Validate Voucher (client-side) | vouchers-validate | validate-voucher-client-side |
|  | Validate Promotions | validate-promotions-1 | validate-promotions |
| **Redemptions** | Get Voucher's Redemptions | vouchers-redemptions | get-voucher-redemptions |
| **Stackable Discounts** | Validate Stackable Discounts | validate-stacked-discounts-1 | validate-stacked-discounts |
|  | Validate Stackable Discounts (client-side) | validate-stackable-discounts-client-side | validate-stacked-discounts-client-side |
|  | Redeem Stackable Discounts | redeem-stackable-discounts-client-side | redeem-stacked-discounts-client-side |
|  | Rollback Stackable Redemptions | rollback-stackable-redemptions | rollback-stacked-redemptions |
| **Loyalties** | Get Reward Assignment | get-reward-assignment | get-reward-assignment-1 |
|  | Get Reward Assignment | get-reward-assignment-1 | get-reward-assignment-2 |
|  | List Reward Assignments | list-reward-assignments-1 | list-reward-assignments-2 |
|  | List Reward Assignments | list-reward-assignments-2 | list-reward-assignments-1 |
|  | Redeem Reward | redeem-loyalty-card | redeem-reward-1 |
|  | Add Member | create-member | add-member |
|  | Get Member | get-member | get-member-1 |
|  | Get Member | get-member-1 | get-member |
|  | Get Member Activities | get-member-activities-1 | get-member-activities |
|  | Get Member Activities | get-member-activities | get-member-activities-1 |
|  | Add or Remove Loyalty Card Balance | add-loyalty-card-balance | add-remove-loyalty-card-balance-1 |
|  | Transfer Loyalty Points | transfer-points2 | transfer-points |
| **Customers** | Get Customer | read-customer | get-customer |
|  | Update Customers in Bulk | post-customers-in-bulk | update-customers-in-bulk |
|  | Update Customers Metadata in Bulk | post-customers-metadata-in-bulk | update-customers-metadata-in-bulk |
|  | Update Customer's consents (client) | update-customers-consents-client | update-customers-consents-client-side |
|  | List Customer Activities | get-customer-activities | list-customer-activities |
|  | List Customer's Segments | list-segments | list-customer-segments |
| **Orders** | Create Export | create-export-1 | create-order-export |
| **Products** | Update Products in bulk | post-products-in-bulk | update-products-in-bulk |
|  | Update Products Metadata in bulk | async-update-products-metadata-in-bulk | update-products-metadata-in-bulk |
|  | Get SKU | get-sku-v20210726 | get-sku |
|  | List SKUs | list-skus | list-skus-in-product |
|  | Import Products Using CSV | import-products-by-csv | import-products-using-csv |
|  | Import SKUS using CSV | import-skus-by-csv | import-skus-using-csv |
| **Product Collections** | List Products in Collection | get-products-in-collection | list-products-in-collection |
| **Validation Rules** | Get Validation Rules | get-validation-rules | get-validation-rule |
|  | Update Validation Rule | update-validation-rules | update-validation-rule |
|  | Create Validation Rules Assignment | create-validation-rules-assignment | create-validation-rule-assignment |
|  | Delete Validation Rules Assignment | delete-validation-rules-assignment | delete-validation-rule-assignment |
| **Events** | Track Custom Event | create-custom-event | track-custom-event |
| **Consents** | List Consents | get-consents | list-consents |
|  | List Consents (client-side) | get-consent-client-side | list-consents-client-side |
| **Async Actions** | Get Async Action | get-async-actions-1 | get-async-action |

### Slugs updated for Guides

| **Category** | **Guide** | **Previous Slug** | **New Slug** |
|:---|:---|:---|:---|
| More | Status | status-1 | status |
| Building Blocks | Orders | orders-1 | orders |
| Building Blocks | Vouchers | vouchers-1 | vouchers |
| Building Blocks | Campaigns | campaigns-1 | campaigns |

### Endpoints descriptions that were removed

| **API** | **Endpoint Name** | **Endpoint** | **Slug** | **Why** |
|---|---|---|---|---|
| **Vouchers** | [deprecated] Update Vouchers' metadata in bulk | **POST** `/vouchers/metdata` | update-vouchers-metadata-in-bulk | deprecated |
|  | [deprecated] Update Vouchers in bulk | **POST** `/vouchers/bulk` | update-vouchers-in-bulk | deprecated |
| **Promotions** | Create Promotion Campaign | **POST** `/campaigns` | create-promotion-campaign | path exists under Campaigns API |
| **Customers** | [deprecated] Update Customers' metadata in bulk | **POST** `customers/metadata` | update-customers-metadata-in-bulk | deprecated |
|  | [deprecated] Update Customers in bulk | **POST** `customers/bulk` | update-customers-in-bulk | deprecated |
| **Orders** | Download Export | **GET** `/exports/{id}` | download-export-1 | same in Exports API |
| **Products** | [deprecated] Update Products metadata in bulk | **POST** `/products/metadata` | update-products-metadata-in-bulk | deprecated |
|  | [deprecated] Update Products in bulk | **POST** `/products/bulk` | update-products-in-bulk | deprecated |
|  | Get SKU [deprecated] | **GET** `/products/{productId}/skus/{skuId}` | get-sku | deprecated |

### Endpoints that were added

| **API** | **Endpoint Name** | **Endpoint** | **Slug** |
|---|---|---|---|
| Rewards | Get Reward Assignment | **GET** `/rewards/{rewardId}/assignments/{assignmentId}` | get-reward-assignment |
| Vouchers | List Gift Card Transactions | **GET** `/vouchers/{code}/transactions` | list-gift-card-transactions |
| Vouchers | Export Gift Card Transactions | **POST** `/vouchers/{code}/transactions/export` | export-gift-card-transactions |
| Loyalties | List Loyalty Card Transactions | **GET** `/loyalties/{campaignId}/members/{memberId}/transactions` |  list-loyalty-card-transactions-1 |
| Loyalties | List Loyalty Card Transactions | **GET** `/loyalties/members/{memberId}/transactions` | list-loyalty-card-transactions |
| Loyalties | Export Loyalty Card Transactions | **POST** `/loyalties/{campaignId}/members/{memberId}/transactions/export` | export-loyalty-card-transactions-1 |
| Loyalties | Export Loyalty Card Transactions | **POST** `/loyalties/members/{memberId}/transactions/export` | export-loyalty-card-transactions |


### Slugs updated for Object Schemas

| **API** | **Object Definition** | **Previous Slug** | **New Slug** |
|---|---|---|
| **Vouchers** | The Voucher Object | the-voucher-object | voucher-object |
| **Campaigns** | The Campaign Object | the-campaign-object | campaign-object |
| **Promotions** | The Promotion Tier Object | the-promotion-object | promotion-tier-object |
| **Rewards** | The Reward Object | the-reward-object | reward-object |
|  | The Reward Assignment Object | the-reward-assignment-object | reward-assignment-object |
| **Validations** | The Validation Object | the-validation-object | validation-object |
| **Redemptions** | The Redemption Object | the-redemption-object | redemption-object |
|  | The Redemption Rollback Object | the-redemption-rollback-object | rollback-redemption-object |
| **Loyalties** | The Loyalty Campaign Object | the-loyalty-campaign-object |  |
|  | The Loyalty Card Object | loyalty-card-object | loyalty-card-object (_slug remains the same_) |
|  | The Earning Rule Object | the-earning-rule-object | earning-rule-object |
|  | The Loyalty Tiers Object | the-loyalty-tiers-object | loyalty-tier-object |
|  | The Customer Object | the-customer-object | _moved to Customers API and re-named to_ customer-object |
|  | The Customer Activity Object | the-customer-activities-object | _moved to Customers API and re-named to_ customer-activity-object |
| **Orders** | The Order Object | the-order-object | order-object |
|  | The Order Item Object | the-order-item-object | _removed_ |
| **Products** | The Product Object | the-product-object | product-object |
|  | The SKU Object | the-sku-object | sku-object |
| **Product Collections** | The Product Collections Object | the-product-collections-object | product-collection-object |
| **Validation Rules** | The Validation Rule Object | the-validation-rule-object | validation-rule-object |
|  | The Validation Rule Assignment Object | the-validation-rule-assignment-object | validation-rule-assignment-object |
| **Segments** | The Segment Object | the-segment-object | customer-segment-object |
| **Events** | The Custom Event Object | the-custom-event-object | custom-event-object |
| **Exports** | The Export Object | the-export-object | export-object |
| **Categories** | The Category Object | category-object | category-object (_slug remains the same_) |
| **Metadata Schemas** | The Metadata Schema Object | the-metadata-schema-object | metadata-schema-object |

### Slugs for newly added objects

| **API** | **Object Definition** | **New Slug** |
|---|---|---|
| **Publications** | The Voucher Object | publication-object |
| **Stackable Discounts API** | Stackable Redemptions Object | stackable-redemptions-object |
| **Loyalties API** | Loyalty Campaign Object | loyalty-campaign-object |
| **Consents API** | Consents Object | consents-object |
| **Async Actions API** | Async Action Object | async-action-object |



### API Reference Guides that were turned into redirects

| **API** | **Title** | **Slug** | **Now links to** |
|:---|:---|:---|:---|
| Validations | Validation Session | validation-session | locking-validation-session |
| Stackable Discounts | Establish Validation Session | establish-validation-session | locking-validation-session |
| Stackable Discounts | API Overview | stacking-api-overview | manage-stackable-discounts |

### API Reference Guides removed

| **API** | **Title** | **Slug** | **Reason** |
|:---|:---|:---|:---|
| Stackable Discounts | Redeemables Reference | redeemables-reference | same content in Guide with slug manage-stackable-discounts |