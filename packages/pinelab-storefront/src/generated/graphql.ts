export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Money` scalar type represents monetary values and supports signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Money: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ActiveOrderResult = Order | NoActiveOrderError;

export type AddPaymentToOrderResult =
  | Order
  | OrderPaymentStateError
  | IneligiblePaymentMethodError
  | PaymentFailedError
  | PaymentDeclinedError
  | OrderStateTransitionError
  | NoActiveOrderError;

export type Address = Node & {
  __typename?: 'Address';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1: Scalars['String'];
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  country: Country;
  phoneNumber?: Maybe<Scalars['String']>;
  defaultShippingAddress?: Maybe<Scalars['Boolean']>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type Adjustment = {
  __typename?: 'Adjustment';
  adjustmentSource: Scalars['String'];
  type: AdjustmentType;
  description: Scalars['String'];
  amount: Scalars['Money'];
  data?: Maybe<Scalars['JSON']>;
};

export enum AdjustmentType {
  Promotion = 'PROMOTION',
  DistributedOrderPromotion = 'DISTRIBUTED_ORDER_PROMOTION',
  Other = 'OTHER',
}

/** Returned when attempting to set the Customer for an Order when already logged in. */
export type AlreadyLoggedInError = ErrorResult & {
  __typename?: 'AlreadyLoggedInError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type ApplyCouponCodeResult =
  | Order
  | CouponCodeExpiredError
  | CouponCodeInvalidError
  | CouponCodeLimitError;

export type Asset = Node & {
  __typename?: 'Asset';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  type: AssetType;
  fileSize: Scalars['Int'];
  mimeType: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  source: Scalars['String'];
  preview: Scalars['String'];
  focalPoint?: Maybe<Coordinate>;
  tags: Array<Tag>;
  thumbnail: Scalars['String'];
  customFields?: Maybe<Scalars['JSON']>;
};

export type AssetList = PaginatedList & {
  __typename?: 'AssetList';
  items: Array<Asset>;
  totalItems: Scalars['Int'];
};

export enum AssetType {
  Image = 'IMAGE',
  Video = 'VIDEO',
  Binary = 'BINARY',
}

export type AuthenticationInput = {
  native?: Maybe<NativeAuthInput>;
};

export type AuthenticationMethod = Node & {
  __typename?: 'AuthenticationMethod';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  strategy: Scalars['String'];
};

export type AuthenticationResult =
  | CurrentUser
  | InvalidCredentialsError
  | NotVerifiedError;

export type BooleanCustomFieldConfig = CustomField & {
  __typename?: 'BooleanCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  ui?: Maybe<Scalars['JSON']>;
};

/** Operators for filtering on a list of Boolean fields */
export type BooleanListOperators = {
  inList: Scalars['Boolean'];
};

/** Operators for filtering on a Boolean field */
export type BooleanOperators = {
  eq?: Maybe<Scalars['Boolean']>;
  isNull?: Maybe<Scalars['Boolean']>;
};

export type Channel = Node & {
  __typename?: 'Channel';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  code: Scalars['String'];
  token: Scalars['String'];
  defaultTaxZone?: Maybe<Zone>;
  defaultShippingZone?: Maybe<Zone>;
  defaultLanguageCode: LanguageCode;
  availableLanguageCodes?: Maybe<Array<LanguageCode>>;
  /** @deprecated Use defaultCurrencyCode instead */
  currencyCode: CurrencyCode;
  defaultCurrencyCode: CurrencyCode;
  availableCurrencyCodes: Array<CurrencyCode>;
  /** Not yet used - will be implemented in a future release. */
  trackInventory?: Maybe<Scalars['Boolean']>;
  /** Not yet used - will be implemented in a future release. */
  outOfStockThreshold?: Maybe<Scalars['Int']>;
  pricesIncludeTax: Scalars['Boolean'];
  seller?: Maybe<Seller>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type Collection = Node & {
  __typename?: 'Collection';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode?: Maybe<LanguageCode>;
  name: Scalars['String'];
  slug: Scalars['String'];
  breadcrumbs: Array<CollectionBreadcrumb>;
  position: Scalars['Int'];
  description: Scalars['String'];
  featuredAsset?: Maybe<Asset>;
  assets: Array<Asset>;
  parent?: Maybe<Collection>;
  parentId: Scalars['ID'];
  children?: Maybe<Array<Collection>>;
  filters: Array<ConfigurableOperation>;
  translations: Array<CollectionTranslation>;
  productVariants: ProductVariantList;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CollectionProductVariantsArgs = {
  options?: Maybe<ProductVariantListOptions>;
};

export type CollectionBreadcrumb = {
  __typename?: 'CollectionBreadcrumb';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CollectionFilterParameter = {
  id?: Maybe<IdOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  slug?: Maybe<StringOperators>;
  position?: Maybe<NumberOperators>;
  description?: Maybe<StringOperators>;
  parentId?: Maybe<IdOperators>;
};

export type CollectionList = PaginatedList & {
  __typename?: 'CollectionList';
  items: Array<Collection>;
  totalItems: Scalars['Int'];
};

export type CollectionListOptions = {
  topLevelOnly?: Maybe<Scalars['Boolean']>;
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<CollectionSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<CollectionFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

/**
 * Which Collections are present in the products returned
 * by the search, and in what quantity.
 */
export type CollectionResult = {
  __typename?: 'CollectionResult';
  collection: Collection;
  count: Scalars['Int'];
};

export type CollectionSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  slug?: Maybe<SortOrder>;
  position?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  parentId?: Maybe<SortOrder>;
};

export type CollectionTranslation = {
  __typename?: 'CollectionTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
};

export type ConfigArg = {
  __typename?: 'ConfigArg';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type ConfigArgDefinition = {
  __typename?: 'ConfigArgDefinition';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  required: Scalars['Boolean'];
  defaultValue?: Maybe<Scalars['JSON']>;
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type ConfigArgInput = {
  name: Scalars['String'];
  /** A JSON stringified representation of the actual value */
  value: Scalars['String'];
};

export type ConfigurableOperation = {
  __typename?: 'ConfigurableOperation';
  code: Scalars['String'];
  args: Array<ConfigArg>;
};

export type ConfigurableOperationDefinition = {
  __typename?: 'ConfigurableOperationDefinition';
  code: Scalars['String'];
  args: Array<ConfigArgDefinition>;
  description: Scalars['String'];
};

export type ConfigurableOperationInput = {
  code: Scalars['String'];
  arguments: Array<ConfigArgInput>;
};

export type Coordinate = {
  __typename?: 'Coordinate';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type Country = Region &
  Node & {
    __typename?: 'Country';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    code: Scalars['String'];
    type: Scalars['String'];
    name: Scalars['String'];
    enabled: Scalars['Boolean'];
    parent?: Maybe<Region>;
    parentId?: Maybe<Scalars['ID']>;
    translations: Array<RegionTranslation>;
    customFields?: Maybe<Scalars['JSON']>;
  };

export type CountryList = PaginatedList & {
  __typename?: 'CountryList';
  items: Array<Country>;
  totalItems: Scalars['Int'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeExpiredError = ErrorResult & {
  __typename?: 'CouponCodeExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  couponCode: Scalars['String'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeInvalidError = ErrorResult & {
  __typename?: 'CouponCodeInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  couponCode: Scalars['String'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeLimitError = ErrorResult & {
  __typename?: 'CouponCodeLimitError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  couponCode: Scalars['String'];
  limit: Scalars['Int'];
};

export type CreateAddressInput = {
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1: Scalars['String'];
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  countryCode: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  defaultShippingAddress?: Maybe<Scalars['Boolean']>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateCustomerInput = {
  title?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  customFields?: Maybe<Scalars['JSON']>;
};

/**
 * @description
 * ISO 4217 currency code
 *
 * @docsCategory common
 */
export enum CurrencyCode {
  /** United Arab Emirates dirham */
  Aed = 'AED',
  /** Afghan afghani */
  Afn = 'AFN',
  /** Albanian lek */
  All = 'ALL',
  /** Armenian dram */
  Amd = 'AMD',
  /** Netherlands Antillean guilder */
  Ang = 'ANG',
  /** Angolan kwanza */
  Aoa = 'AOA',
  /** Argentine peso */
  Ars = 'ARS',
  /** Australian dollar */
  Aud = 'AUD',
  /** Aruban florin */
  Awg = 'AWG',
  /** Azerbaijani manat */
  Azn = 'AZN',
  /** Bosnia and Herzegovina convertible mark */
  Bam = 'BAM',
  /** Barbados dollar */
  Bbd = 'BBD',
  /** Bangladeshi taka */
  Bdt = 'BDT',
  /** Bulgarian lev */
  Bgn = 'BGN',
  /** Bahraini dinar */
  Bhd = 'BHD',
  /** Burundian franc */
  Bif = 'BIF',
  /** Bermudian dollar */
  Bmd = 'BMD',
  /** Brunei dollar */
  Bnd = 'BND',
  /** Boliviano */
  Bob = 'BOB',
  /** Brazilian real */
  Brl = 'BRL',
  /** Bahamian dollar */
  Bsd = 'BSD',
  /** Bhutanese ngultrum */
  Btn = 'BTN',
  /** Botswana pula */
  Bwp = 'BWP',
  /** Belarusian ruble */
  Byn = 'BYN',
  /** Belize dollar */
  Bzd = 'BZD',
  /** Canadian dollar */
  Cad = 'CAD',
  /** Congolese franc */
  Cdf = 'CDF',
  /** Swiss franc */
  Chf = 'CHF',
  /** Chilean peso */
  Clp = 'CLP',
  /** Renminbi (Chinese) yuan */
  Cny = 'CNY',
  /** Colombian peso */
  Cop = 'COP',
  /** Costa Rican colon */
  Crc = 'CRC',
  /** Cuban convertible peso */
  Cuc = 'CUC',
  /** Cuban peso */
  Cup = 'CUP',
  /** Cape Verde escudo */
  Cve = 'CVE',
  /** Czech koruna */
  Czk = 'CZK',
  /** Djiboutian franc */
  Djf = 'DJF',
  /** Danish krone */
  Dkk = 'DKK',
  /** Dominican peso */
  Dop = 'DOP',
  /** Algerian dinar */
  Dzd = 'DZD',
  /** Egyptian pound */
  Egp = 'EGP',
  /** Eritrean nakfa */
  Ern = 'ERN',
  /** Ethiopian birr */
  Etb = 'ETB',
  /** Euro */
  Eur = 'EUR',
  /** Fiji dollar */
  Fjd = 'FJD',
  /** Falkland Islands pound */
  Fkp = 'FKP',
  /** Pound sterling */
  Gbp = 'GBP',
  /** Georgian lari */
  Gel = 'GEL',
  /** Ghanaian cedi */
  Ghs = 'GHS',
  /** Gibraltar pound */
  Gip = 'GIP',
  /** Gambian dalasi */
  Gmd = 'GMD',
  /** Guinean franc */
  Gnf = 'GNF',
  /** Guatemalan quetzal */
  Gtq = 'GTQ',
  /** Guyanese dollar */
  Gyd = 'GYD',
  /** Hong Kong dollar */
  Hkd = 'HKD',
  /** Honduran lempira */
  Hnl = 'HNL',
  /** Croatian kuna */
  Hrk = 'HRK',
  /** Haitian gourde */
  Htg = 'HTG',
  /** Hungarian forint */
  Huf = 'HUF',
  /** Indonesian rupiah */
  Idr = 'IDR',
  /** Israeli new shekel */
  Ils = 'ILS',
  /** Indian rupee */
  Inr = 'INR',
  /** Iraqi dinar */
  Iqd = 'IQD',
  /** Iranian rial */
  Irr = 'IRR',
  /** Icelandic króna */
  Isk = 'ISK',
  /** Jamaican dollar */
  Jmd = 'JMD',
  /** Jordanian dinar */
  Jod = 'JOD',
  /** Japanese yen */
  Jpy = 'JPY',
  /** Kenyan shilling */
  Kes = 'KES',
  /** Kyrgyzstani som */
  Kgs = 'KGS',
  /** Cambodian riel */
  Khr = 'KHR',
  /** Comoro franc */
  Kmf = 'KMF',
  /** North Korean won */
  Kpw = 'KPW',
  /** South Korean won */
  Krw = 'KRW',
  /** Kuwaiti dinar */
  Kwd = 'KWD',
  /** Cayman Islands dollar */
  Kyd = 'KYD',
  /** Kazakhstani tenge */
  Kzt = 'KZT',
  /** Lao kip */
  Lak = 'LAK',
  /** Lebanese pound */
  Lbp = 'LBP',
  /** Sri Lankan rupee */
  Lkr = 'LKR',
  /** Liberian dollar */
  Lrd = 'LRD',
  /** Lesotho loti */
  Lsl = 'LSL',
  /** Libyan dinar */
  Lyd = 'LYD',
  /** Moroccan dirham */
  Mad = 'MAD',
  /** Moldovan leu */
  Mdl = 'MDL',
  /** Malagasy ariary */
  Mga = 'MGA',
  /** Macedonian denar */
  Mkd = 'MKD',
  /** Myanmar kyat */
  Mmk = 'MMK',
  /** Mongolian tögrög */
  Mnt = 'MNT',
  /** Macanese pataca */
  Mop = 'MOP',
  /** Mauritanian ouguiya */
  Mru = 'MRU',
  /** Mauritian rupee */
  Mur = 'MUR',
  /** Maldivian rufiyaa */
  Mvr = 'MVR',
  /** Malawian kwacha */
  Mwk = 'MWK',
  /** Mexican peso */
  Mxn = 'MXN',
  /** Malaysian ringgit */
  Myr = 'MYR',
  /** Mozambican metical */
  Mzn = 'MZN',
  /** Namibian dollar */
  Nad = 'NAD',
  /** Nigerian naira */
  Ngn = 'NGN',
  /** Nicaraguan córdoba */
  Nio = 'NIO',
  /** Norwegian krone */
  Nok = 'NOK',
  /** Nepalese rupee */
  Npr = 'NPR',
  /** New Zealand dollar */
  Nzd = 'NZD',
  /** Omani rial */
  Omr = 'OMR',
  /** Panamanian balboa */
  Pab = 'PAB',
  /** Peruvian sol */
  Pen = 'PEN',
  /** Papua New Guinean kina */
  Pgk = 'PGK',
  /** Philippine peso */
  Php = 'PHP',
  /** Pakistani rupee */
  Pkr = 'PKR',
  /** Polish złoty */
  Pln = 'PLN',
  /** Paraguayan guaraní */
  Pyg = 'PYG',
  /** Qatari riyal */
  Qar = 'QAR',
  /** Romanian leu */
  Ron = 'RON',
  /** Serbian dinar */
  Rsd = 'RSD',
  /** Russian ruble */
  Rub = 'RUB',
  /** Rwandan franc */
  Rwf = 'RWF',
  /** Saudi riyal */
  Sar = 'SAR',
  /** Solomon Islands dollar */
  Sbd = 'SBD',
  /** Seychelles rupee */
  Scr = 'SCR',
  /** Sudanese pound */
  Sdg = 'SDG',
  /** Swedish krona/kronor */
  Sek = 'SEK',
  /** Singapore dollar */
  Sgd = 'SGD',
  /** Saint Helena pound */
  Shp = 'SHP',
  /** Sierra Leonean leone */
  Sll = 'SLL',
  /** Somali shilling */
  Sos = 'SOS',
  /** Surinamese dollar */
  Srd = 'SRD',
  /** South Sudanese pound */
  Ssp = 'SSP',
  /** São Tomé and Príncipe dobra */
  Stn = 'STN',
  /** Salvadoran colón */
  Svc = 'SVC',
  /** Syrian pound */
  Syp = 'SYP',
  /** Swazi lilangeni */
  Szl = 'SZL',
  /** Thai baht */
  Thb = 'THB',
  /** Tajikistani somoni */
  Tjs = 'TJS',
  /** Turkmenistan manat */
  Tmt = 'TMT',
  /** Tunisian dinar */
  Tnd = 'TND',
  /** Tongan paʻanga */
  Top = 'TOP',
  /** Turkish lira */
  Try = 'TRY',
  /** Trinidad and Tobago dollar */
  Ttd = 'TTD',
  /** New Taiwan dollar */
  Twd = 'TWD',
  /** Tanzanian shilling */
  Tzs = 'TZS',
  /** Ukrainian hryvnia */
  Uah = 'UAH',
  /** Ugandan shilling */
  Ugx = 'UGX',
  /** United States dollar */
  Usd = 'USD',
  /** Uruguayan peso */
  Uyu = 'UYU',
  /** Uzbekistan som */
  Uzs = 'UZS',
  /** Venezuelan bolívar soberano */
  Ves = 'VES',
  /** Vietnamese đồng */
  Vnd = 'VND',
  /** Vanuatu vatu */
  Vuv = 'VUV',
  /** Samoan tala */
  Wst = 'WST',
  /** CFA franc BEAC */
  Xaf = 'XAF',
  /** East Caribbean dollar */
  Xcd = 'XCD',
  /** CFA franc BCEAO */
  Xof = 'XOF',
  /** CFP franc (franc Pacifique) */
  Xpf = 'XPF',
  /** Yemeni rial */
  Yer = 'YER',
  /** South African rand */
  Zar = 'ZAR',
  /** Zambian kwacha */
  Zmw = 'ZMW',
  /** Zimbabwean dollar */
  Zwl = 'ZWL',
}

export type CurrentUser = {
  __typename?: 'CurrentUser';
  id: Scalars['ID'];
  identifier: Scalars['String'];
  channels: Array<CurrentUserChannel>;
};

export type CurrentUserChannel = {
  __typename?: 'CurrentUserChannel';
  id: Scalars['ID'];
  token: Scalars['String'];
  code: Scalars['String'];
  permissions: Array<Permission>;
};

export type CustomField = {
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type CustomFieldConfig =
  | StringCustomFieldConfig
  | LocaleStringCustomFieldConfig
  | IntCustomFieldConfig
  | FloatCustomFieldConfig
  | BooleanCustomFieldConfig
  | DateTimeCustomFieldConfig
  | RelationCustomFieldConfig
  | TextCustomFieldConfig
  | LocaleTextCustomFieldConfig;

export type Customer = Node & {
  __typename?: 'Customer';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  addresses?: Maybe<Array<Address>>;
  orders: OrderList;
  user?: Maybe<User>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CustomerOrdersArgs = {
  options?: Maybe<OrderListOptions>;
};

export type CustomerFilterParameter = {
  id?: Maybe<IdOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  title?: Maybe<StringOperators>;
  firstName?: Maybe<StringOperators>;
  lastName?: Maybe<StringOperators>;
  phoneNumber?: Maybe<StringOperators>;
  emailAddress?: Maybe<StringOperators>;
};

export type CustomerGroup = Node & {
  __typename?: 'CustomerGroup';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  customers: CustomerList;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CustomerGroupCustomersArgs = {
  options?: Maybe<CustomerListOptions>;
};

export type CustomerList = PaginatedList & {
  __typename?: 'CustomerList';
  items: Array<Customer>;
  totalItems: Scalars['Int'];
};

export type CustomerListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<CustomerSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<CustomerFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type CustomerSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
  phoneNumber?: Maybe<SortOrder>;
  emailAddress?: Maybe<SortOrder>;
};

/** Operators for filtering on a list of Date fields */
export type DateListOperators = {
  inList: Scalars['DateTime'];
};

/** Operators for filtering on a DateTime field */
export type DateOperators = {
  eq?: Maybe<Scalars['DateTime']>;
  before?: Maybe<Scalars['DateTime']>;
  after?: Maybe<Scalars['DateTime']>;
  between?: Maybe<DateRange>;
  isNull?: Maybe<Scalars['Boolean']>;
};

export type DateRange = {
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
};

/**
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 */
export type DateTimeCustomFieldConfig = CustomField & {
  __typename?: 'DateTimeCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  min?: Maybe<Scalars['String']>;
  max?: Maybe<Scalars['String']>;
  step?: Maybe<Scalars['Int']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type DeletionResponse = {
  __typename?: 'DeletionResponse';
  result: DeletionResult;
  message?: Maybe<Scalars['String']>;
};

export enum DeletionResult {
  /** The entity was successfully deleted */
  Deleted = 'DELETED',
  /** Deletion did not take place, reason given in message */
  NotDeleted = 'NOT_DELETED',
}

export type Discount = {
  __typename?: 'Discount';
  adjustmentSource: Scalars['String'];
  type: AdjustmentType;
  description: Scalars['String'];
  amount: Scalars['Money'];
  amountWithTax: Scalars['Money'];
};

export type DutchAddressLookupResult = {
  __typename?: 'DutchAddressLookupResult';
  postalCode: Scalars['String'];
  houseNumber: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  municipality?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lon?: Maybe<Scalars['Float']>;
};

export type DutchPostalCodeInput = {
  postalCode: Scalars['String'];
  houseNumber: Scalars['String'];
};

/** Returned when attempting to create a Customer with an email address already registered to an existing User. */
export type EmailAddressConflictError = ErrorResult & {
  __typename?: 'EmailAddressConflictError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export enum ErrorCode {
  UnknownError = 'UNKNOWN_ERROR',
  NativeAuthStrategyError = 'NATIVE_AUTH_STRATEGY_ERROR',
  InvalidCredentialsError = 'INVALID_CREDENTIALS_ERROR',
  OrderStateTransitionError = 'ORDER_STATE_TRANSITION_ERROR',
  EmailAddressConflictError = 'EMAIL_ADDRESS_CONFLICT_ERROR',
  GuestCheckoutError = 'GUEST_CHECKOUT_ERROR',
  OrderLimitError = 'ORDER_LIMIT_ERROR',
  NegativeQuantityError = 'NEGATIVE_QUANTITY_ERROR',
  InsufficientStockError = 'INSUFFICIENT_STOCK_ERROR',
  CouponCodeInvalidError = 'COUPON_CODE_INVALID_ERROR',
  CouponCodeExpiredError = 'COUPON_CODE_EXPIRED_ERROR',
  CouponCodeLimitError = 'COUPON_CODE_LIMIT_ERROR',
  OrderModificationError = 'ORDER_MODIFICATION_ERROR',
  IneligibleShippingMethodError = 'INELIGIBLE_SHIPPING_METHOD_ERROR',
  NoActiveOrderError = 'NO_ACTIVE_ORDER_ERROR',
  OrderPaymentStateError = 'ORDER_PAYMENT_STATE_ERROR',
  IneligiblePaymentMethodError = 'INELIGIBLE_PAYMENT_METHOD_ERROR',
  PaymentFailedError = 'PAYMENT_FAILED_ERROR',
  PaymentDeclinedError = 'PAYMENT_DECLINED_ERROR',
  AlreadyLoggedInError = 'ALREADY_LOGGED_IN_ERROR',
  MissingPasswordError = 'MISSING_PASSWORD_ERROR',
  PasswordValidationError = 'PASSWORD_VALIDATION_ERROR',
  PasswordAlreadySetError = 'PASSWORD_ALREADY_SET_ERROR',
  VerificationTokenInvalidError = 'VERIFICATION_TOKEN_INVALID_ERROR',
  VerificationTokenExpiredError = 'VERIFICATION_TOKEN_EXPIRED_ERROR',
  IdentifierChangeTokenInvalidError = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR',
  IdentifierChangeTokenExpiredError = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR',
  PasswordResetTokenInvalidError = 'PASSWORD_RESET_TOKEN_INVALID_ERROR',
  PasswordResetTokenExpiredError = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR',
  NotVerifiedError = 'NOT_VERIFIED_ERROR',
  MolliePaymentIntentError = 'MOLLIE_PAYMENT_INTENT_ERROR',
}

export type ErrorResult = {
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Facet = Node & {
  __typename?: 'Facet';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  code: Scalars['String'];
  values: Array<FacetValue>;
  /** Returns a paginated, sortable, filterable list of the Facet's values. Added in v2.1.0. */
  valueList: FacetValueList;
  translations: Array<FacetTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type FacetValueListArgs = {
  options?: Maybe<FacetValueListOptions>;
};

export type FacetFilterParameter = {
  id?: Maybe<IdOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  code?: Maybe<StringOperators>;
};

export type FacetList = PaginatedList & {
  __typename?: 'FacetList';
  items: Array<Facet>;
  totalItems: Scalars['Int'];
};

export type FacetListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<FacetSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<FacetFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type FacetSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
};

export type FacetTranslation = {
  __typename?: 'FacetTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type FacetValue = Node & {
  __typename?: 'FacetValue';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  facet: Facet;
  facetId: Scalars['ID'];
  name: Scalars['String'];
  code: Scalars['String'];
  translations: Array<FacetValueTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

/**
 * Used to construct boolean expressions for filtering search results
 * by FacetValue ID. Examples:
 *
 * * ID=1 OR ID=2: `{ facetValueFilters: [{ or: [1,2] }] }`
 * * ID=1 AND ID=2: `{ facetValueFilters: [{ and: 1 }, { and: 2 }] }`
 * * ID=1 AND (ID=2 OR ID=3): `{ facetValueFilters: [{ and: 1 }, { or: [2,3] }] }`
 */
export type FacetValueFilterInput = {
  and?: Maybe<Scalars['ID']>;
  or?: Maybe<Array<Scalars['ID']>>;
};

export type FacetValueFilterParameter = {
  id?: Maybe<IdOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  facetId?: Maybe<IdOperators>;
  name?: Maybe<StringOperators>;
  code?: Maybe<StringOperators>;
};

export type FacetValueList = PaginatedList & {
  __typename?: 'FacetValueList';
  items: Array<FacetValue>;
  totalItems: Scalars['Int'];
};

export type FacetValueListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<FacetValueSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<FacetValueFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

/**
 * Which FacetValues are present in the products returned
 * by the search, and in what quantity.
 */
export type FacetValueResult = {
  __typename?: 'FacetValueResult';
  facetValue: FacetValue;
  count: Scalars['Int'];
};

export type FacetValueSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  facetId?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
};

export type FacetValueTranslation = {
  __typename?: 'FacetValueTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type FloatCustomFieldConfig = CustomField & {
  __typename?: 'FloatCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  min?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  step?: Maybe<Scalars['Float']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type Fulfillment = Node & {
  __typename?: 'Fulfillment';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  lines: Array<FulfillmentLine>;
  /** @deprecated Use the `lines` field instead */
  summary: Array<FulfillmentLine>;
  state: Scalars['String'];
  method: Scalars['String'];
  trackingCode?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type FulfillmentLine = {
  __typename?: 'FulfillmentLine';
  orderLine: OrderLine;
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
  fulfillment: Fulfillment;
  fulfillmentId: Scalars['ID'];
};

export enum GlobalFlag {
  True = 'TRUE',
  False = 'FALSE',
  Inherit = 'INHERIT',
}

/** Returned when attempting to set the Customer on a guest checkout when the configured GuestCheckoutStrategy does not allow it. */
export type GuestCheckoutError = ErrorResult & {
  __typename?: 'GuestCheckoutError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  errorDetail: Scalars['String'];
};

export type HistoryEntry = Node & {
  __typename?: 'HistoryEntry';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  type: HistoryEntryType;
  data: Scalars['JSON'];
};

export type HistoryEntryFilterParameter = {
  id?: Maybe<IdOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  type?: Maybe<StringOperators>;
};

export type HistoryEntryList = PaginatedList & {
  __typename?: 'HistoryEntryList';
  items: Array<HistoryEntry>;
  totalItems: Scalars['Int'];
};

export type HistoryEntryListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<HistoryEntrySortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<HistoryEntryFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type HistoryEntrySortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export enum HistoryEntryType {
  CustomerRegistered = 'CUSTOMER_REGISTERED',
  CustomerVerified = 'CUSTOMER_VERIFIED',
  CustomerDetailUpdated = 'CUSTOMER_DETAIL_UPDATED',
  CustomerAddedToGroup = 'CUSTOMER_ADDED_TO_GROUP',
  CustomerRemovedFromGroup = 'CUSTOMER_REMOVED_FROM_GROUP',
  CustomerAddressCreated = 'CUSTOMER_ADDRESS_CREATED',
  CustomerAddressUpdated = 'CUSTOMER_ADDRESS_UPDATED',
  CustomerAddressDeleted = 'CUSTOMER_ADDRESS_DELETED',
  CustomerPasswordUpdated = 'CUSTOMER_PASSWORD_UPDATED',
  CustomerPasswordResetRequested = 'CUSTOMER_PASSWORD_RESET_REQUESTED',
  CustomerPasswordResetVerified = 'CUSTOMER_PASSWORD_RESET_VERIFIED',
  CustomerEmailUpdateRequested = 'CUSTOMER_EMAIL_UPDATE_REQUESTED',
  CustomerEmailUpdateVerified = 'CUSTOMER_EMAIL_UPDATE_VERIFIED',
  CustomerNote = 'CUSTOMER_NOTE',
  OrderStateTransition = 'ORDER_STATE_TRANSITION',
  OrderPaymentTransition = 'ORDER_PAYMENT_TRANSITION',
  OrderFulfillment = 'ORDER_FULFILLMENT',
  OrderCancellation = 'ORDER_CANCELLATION',
  OrderRefundTransition = 'ORDER_REFUND_TRANSITION',
  OrderFulfillmentTransition = 'ORDER_FULFILLMENT_TRANSITION',
  OrderNote = 'ORDER_NOTE',
  OrderCouponApplied = 'ORDER_COUPON_APPLIED',
  OrderCouponRemoved = 'ORDER_COUPON_REMOVED',
  OrderModified = 'ORDER_MODIFIED',
}

/** Operators for filtering on a list of ID fields */
export type IdListOperators = {
  inList: Scalars['ID'];
};

/** Operators for filtering on an ID field */
export type IdOperators = {
  eq?: Maybe<Scalars['String']>;
  notEq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  isNull?: Maybe<Scalars['Boolean']>;
};

/**
 * Returned if the token used to change a Customer's email address is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type IdentifierChangeTokenExpiredError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the token used to change a Customer's email address is either
 * invalid or does not match any expected tokens.
 */
export type IdentifierChangeTokenInvalidError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to add a Payment using a PaymentMethod for which the Order is not eligible. */
export type IneligiblePaymentMethodError = ErrorResult & {
  __typename?: 'IneligiblePaymentMethodError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  eligibilityCheckerMessage?: Maybe<Scalars['String']>;
};

/** Returned when attempting to set a ShippingMethod for which the Order is not eligible */
export type IneligibleShippingMethodError = ErrorResult & {
  __typename?: 'IneligibleShippingMethodError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to add more items to the Order than are available */
export type InsufficientStockError = ErrorResult & {
  __typename?: 'InsufficientStockError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  quantityAvailable: Scalars['Int'];
  order: Order;
};

export type IntCustomFieldConfig = CustomField & {
  __typename?: 'IntCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  min?: Maybe<Scalars['Int']>;
  max?: Maybe<Scalars['Int']>;
  step?: Maybe<Scalars['Int']>;
  ui?: Maybe<Scalars['JSON']>;
};

/** Returned if the user authentication credentials are not valid */
export type InvalidCredentialsError = ErrorResult & {
  __typename?: 'InvalidCredentialsError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  authenticationError: Scalars['String'];
};

/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 *
 * @docsCategory common
 */
export enum LanguageCode {
  /** Afrikaans */
  Af = 'af',
  /** Akan */
  Ak = 'ak',
  /** Albanian */
  Sq = 'sq',
  /** Amharic */
  Am = 'am',
  /** Arabic */
  Ar = 'ar',
  /** Armenian */
  Hy = 'hy',
  /** Assamese */
  As = 'as',
  /** Azerbaijani */
  Az = 'az',
  /** Bambara */
  Bm = 'bm',
  /** Bangla */
  Bn = 'bn',
  /** Basque */
  Eu = 'eu',
  /** Belarusian */
  Be = 'be',
  /** Bosnian */
  Bs = 'bs',
  /** Breton */
  Br = 'br',
  /** Bulgarian */
  Bg = 'bg',
  /** Burmese */
  My = 'my',
  /** Catalan */
  Ca = 'ca',
  /** Chechen */
  Ce = 'ce',
  /** Chinese */
  Zh = 'zh',
  /** Simplified Chinese */
  ZhHans = 'zh_Hans',
  /** Traditional Chinese */
  ZhHant = 'zh_Hant',
  /** Church Slavic */
  Cu = 'cu',
  /** Cornish */
  Kw = 'kw',
  /** Corsican */
  Co = 'co',
  /** Croatian */
  Hr = 'hr',
  /** Czech */
  Cs = 'cs',
  /** Danish */
  Da = 'da',
  /** Dutch */
  Nl = 'nl',
  /** Flemish */
  NlBe = 'nl_BE',
  /** Dzongkha */
  Dz = 'dz',
  /** English */
  En = 'en',
  /** Australian English */
  EnAu = 'en_AU',
  /** Canadian English */
  EnCa = 'en_CA',
  /** British English */
  EnGb = 'en_GB',
  /** American English */
  EnUs = 'en_US',
  /** Esperanto */
  Eo = 'eo',
  /** Estonian */
  Et = 'et',
  /** Ewe */
  Ee = 'ee',
  /** Faroese */
  Fo = 'fo',
  /** Finnish */
  Fi = 'fi',
  /** French */
  Fr = 'fr',
  /** Canadian French */
  FrCa = 'fr_CA',
  /** Swiss French */
  FrCh = 'fr_CH',
  /** Fulah */
  Ff = 'ff',
  /** Galician */
  Gl = 'gl',
  /** Ganda */
  Lg = 'lg',
  /** Georgian */
  Ka = 'ka',
  /** German */
  De = 'de',
  /** Austrian German */
  DeAt = 'de_AT',
  /** Swiss High German */
  DeCh = 'de_CH',
  /** Greek */
  El = 'el',
  /** Gujarati */
  Gu = 'gu',
  /** Haitian Creole */
  Ht = 'ht',
  /** Hausa */
  Ha = 'ha',
  /** Hebrew */
  He = 'he',
  /** Hindi */
  Hi = 'hi',
  /** Hungarian */
  Hu = 'hu',
  /** Icelandic */
  Is = 'is',
  /** Igbo */
  Ig = 'ig',
  /** Indonesian */
  Id = 'id',
  /** Interlingua */
  Ia = 'ia',
  /** Irish */
  Ga = 'ga',
  /** Italian */
  It = 'it',
  /** Japanese */
  Ja = 'ja',
  /** Javanese */
  Jv = 'jv',
  /** Kalaallisut */
  Kl = 'kl',
  /** Kannada */
  Kn = 'kn',
  /** Kashmiri */
  Ks = 'ks',
  /** Kazakh */
  Kk = 'kk',
  /** Khmer */
  Km = 'km',
  /** Kikuyu */
  Ki = 'ki',
  /** Kinyarwanda */
  Rw = 'rw',
  /** Korean */
  Ko = 'ko',
  /** Kurdish */
  Ku = 'ku',
  /** Kyrgyz */
  Ky = 'ky',
  /** Lao */
  Lo = 'lo',
  /** Latin */
  La = 'la',
  /** Latvian */
  Lv = 'lv',
  /** Lingala */
  Ln = 'ln',
  /** Lithuanian */
  Lt = 'lt',
  /** Luba-Katanga */
  Lu = 'lu',
  /** Luxembourgish */
  Lb = 'lb',
  /** Macedonian */
  Mk = 'mk',
  /** Malagasy */
  Mg = 'mg',
  /** Malay */
  Ms = 'ms',
  /** Malayalam */
  Ml = 'ml',
  /** Maltese */
  Mt = 'mt',
  /** Manx */
  Gv = 'gv',
  /** Maori */
  Mi = 'mi',
  /** Marathi */
  Mr = 'mr',
  /** Mongolian */
  Mn = 'mn',
  /** Nepali */
  Ne = 'ne',
  /** North Ndebele */
  Nd = 'nd',
  /** Northern Sami */
  Se = 'se',
  /** Norwegian Bokmål */
  Nb = 'nb',
  /** Norwegian Nynorsk */
  Nn = 'nn',
  /** Nyanja */
  Ny = 'ny',
  /** Odia */
  Or = 'or',
  /** Oromo */
  Om = 'om',
  /** Ossetic */
  Os = 'os',
  /** Pashto */
  Ps = 'ps',
  /** Persian */
  Fa = 'fa',
  /** Dari */
  FaAf = 'fa_AF',
  /** Polish */
  Pl = 'pl',
  /** Portuguese */
  Pt = 'pt',
  /** Brazilian Portuguese */
  PtBr = 'pt_BR',
  /** European Portuguese */
  PtPt = 'pt_PT',
  /** Punjabi */
  Pa = 'pa',
  /** Quechua */
  Qu = 'qu',
  /** Romanian */
  Ro = 'ro',
  /** Moldavian */
  RoMd = 'ro_MD',
  /** Romansh */
  Rm = 'rm',
  /** Rundi */
  Rn = 'rn',
  /** Russian */
  Ru = 'ru',
  /** Samoan */
  Sm = 'sm',
  /** Sango */
  Sg = 'sg',
  /** Sanskrit */
  Sa = 'sa',
  /** Scottish Gaelic */
  Gd = 'gd',
  /** Serbian */
  Sr = 'sr',
  /** Shona */
  Sn = 'sn',
  /** Sichuan Yi */
  Ii = 'ii',
  /** Sindhi */
  Sd = 'sd',
  /** Sinhala */
  Si = 'si',
  /** Slovak */
  Sk = 'sk',
  /** Slovenian */
  Sl = 'sl',
  /** Somali */
  So = 'so',
  /** Southern Sotho */
  St = 'st',
  /** Spanish */
  Es = 'es',
  /** European Spanish */
  EsEs = 'es_ES',
  /** Mexican Spanish */
  EsMx = 'es_MX',
  /** Sundanese */
  Su = 'su',
  /** Swahili */
  Sw = 'sw',
  /** Congo Swahili */
  SwCd = 'sw_CD',
  /** Swedish */
  Sv = 'sv',
  /** Tajik */
  Tg = 'tg',
  /** Tamil */
  Ta = 'ta',
  /** Tatar */
  Tt = 'tt',
  /** Telugu */
  Te = 'te',
  /** Thai */
  Th = 'th',
  /** Tibetan */
  Bo = 'bo',
  /** Tigrinya */
  Ti = 'ti',
  /** Tongan */
  To = 'to',
  /** Turkish */
  Tr = 'tr',
  /** Turkmen */
  Tk = 'tk',
  /** Ukrainian */
  Uk = 'uk',
  /** Urdu */
  Ur = 'ur',
  /** Uyghur */
  Ug = 'ug',
  /** Uzbek */
  Uz = 'uz',
  /** Vietnamese */
  Vi = 'vi',
  /** Volapük */
  Vo = 'vo',
  /** Welsh */
  Cy = 'cy',
  /** Western Frisian */
  Fy = 'fy',
  /** Wolof */
  Wo = 'wo',
  /** Xhosa */
  Xh = 'xh',
  /** Yiddish */
  Yi = 'yi',
  /** Yoruba */
  Yo = 'yo',
  /** Zulu */
  Zu = 'zu',
}

export type LocaleStringCustomFieldConfig = CustomField & {
  __typename?: 'LocaleStringCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  length?: Maybe<Scalars['Int']>;
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  pattern?: Maybe<Scalars['String']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type LocaleTextCustomFieldConfig = CustomField & {
  __typename?: 'LocaleTextCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type LocalizedString = {
  __typename?: 'LocalizedString';
  languageCode: LanguageCode;
  value: Scalars['String'];
};

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR',
}

/** Returned when attempting to register or verify a customer account without a password, when one is required. */
export type MissingPasswordError = ErrorResult & {
  __typename?: 'MissingPasswordError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type MollieAmount = {
  __typename?: 'MollieAmount';
  value?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type MolliePaymentIntent = {
  __typename?: 'MolliePaymentIntent';
  url: Scalars['String'];
};

export type MolliePaymentIntentError = ErrorResult & {
  __typename?: 'MolliePaymentIntentError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type MolliePaymentIntentInput = {
  redirectUrl?: Maybe<Scalars['String']>;
  paymentMethodCode: Scalars['String'];
  molliePaymentMethodCode?: Maybe<Scalars['String']>;
};

export type MolliePaymentIntentResult =
  | MolliePaymentIntent
  | MolliePaymentIntentError;

export type MolliePaymentMethod = {
  __typename?: 'MolliePaymentMethod';
  id: Scalars['ID'];
  code: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  minimumAmount?: Maybe<MollieAmount>;
  maximumAmount?: Maybe<MollieAmount>;
  image?: Maybe<MolliePaymentMethodImages>;
  status?: Maybe<Scalars['String']>;
};

export type MolliePaymentMethodImages = {
  __typename?: 'MolliePaymentMethodImages';
  size1x?: Maybe<Scalars['String']>;
  size2x?: Maybe<Scalars['String']>;
  svg?: Maybe<Scalars['String']>;
};

export type MolliePaymentMethodsInput = {
  paymentMethodCode: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Adds an item to the order. If custom fields are defined on the OrderLine entity, a third argument 'customFields' will be available. */
  addItemToOrder: UpdateOrderItemsResult;
  /** Remove an OrderLine from the Order */
  removeOrderLine: RemoveOrderItemsResult;
  /** Remove all OrderLine from the Order */
  removeAllOrderLines: RemoveOrderItemsResult;
  /** Adjusts an OrderLine. If custom fields are defined on the OrderLine entity, a third argument 'customFields' of type `OrderLineCustomFieldsInput` will be available. */
  adjustOrderLine: UpdateOrderItemsResult;
  /** Applies the given coupon code to the active Order */
  applyCouponCode: ApplyCouponCodeResult;
  /** Removes the given coupon code from the active Order */
  removeCouponCode?: Maybe<Order>;
  /** Transitions an Order to a new state. Valid next states can be found by querying `nextOrderStates` */
  transitionOrderToState?: Maybe<TransitionOrderToStateResult>;
  /** Sets the shipping address for this order */
  setOrderShippingAddress: ActiveOrderResult;
  /** Sets the billing address for this order */
  setOrderBillingAddress: ActiveOrderResult;
  /** Allows any custom fields to be set for the active order */
  setOrderCustomFields: ActiveOrderResult;
  /**
   * Sets the shipping method by id, which can be obtained with the `eligibleShippingMethods` query.
   * An Order can have multiple shipping methods, in which case you can pass an array of ids. In this case,
   * you should configure a custom ShippingLineAssignmentStrategy in order to know which OrderLines each
   * shipping method will apply to.
   */
  setOrderShippingMethod: SetOrderShippingMethodResult;
  /** Add a Payment to the Order */
  addPaymentToOrder: AddPaymentToOrderResult;
  /** Set the Customer for the Order. Required only if the Customer is not currently logged in */
  setCustomerForOrder: SetCustomerForOrderResult;
  /** Authenticates the user using the native authentication strategy. This mutation is an alias for `authenticate({ native: { ... }})` */
  login: NativeAuthenticationResult;
  /** Authenticates the user using a named authentication strategy */
  authenticate: AuthenticationResult;
  /** End the current authenticated session */
  logout: Success;
  /**
   * Register a Customer account with the given credentials. There are three possible registration flows:
   *
   * _If `authOptions.requireVerification` is set to `true`:_
   *
   * 1. **The Customer is registered _with_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _without_ a password. The Customer is then
   *    verified and authenticated in one step.
   * 2. **The Customer is registered _without_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _with_ the chosen password of the Customer. The Customer is then
   *    verified and authenticated in one step.
   *
   * _If `authOptions.requireVerification` is set to `false`:_
   *
   * 3. The Customer _must_ be registered _with_ a password. No further action is needed - the Customer is able to authenticate immediately.
   */
  registerCustomerAccount: RegisterCustomerAccountResult;
  /** Regenerate and send a verification token for a new Customer registration. Only applicable if `authOptions.requireVerification` is set to true. */
  refreshCustomerVerification: RefreshCustomerVerificationResult;
  /** Update an existing Customer */
  updateCustomer: Customer;
  /** Create a new Customer Address */
  createCustomerAddress: Address;
  /** Update an existing Address */
  updateCustomerAddress: Address;
  /** Delete an existing Address */
  deleteCustomerAddress: Success;
  /**
   * Verify a Customer email address with the token sent to that address. Only applicable if `authOptions.requireVerification` is set to true.
   *
   * If the Customer was not registered with a password in the `registerCustomerAccount` mutation, the password _must_ be
   * provided here.
   */
  verifyCustomerAccount: VerifyCustomerAccountResult;
  /** Update the password of the active Customer */
  updateCustomerPassword: UpdateCustomerPasswordResult;
  /**
   * Request to update the emailAddress of the active Customer. If `authOptions.requireVerification` is enabled
   * (as is the default), then the `identifierChangeToken` will be assigned to the current User and
   * a IdentifierChangeRequestEvent will be raised. This can then be used e.g. by the EmailPlugin to email
   * that verification token to the Customer, which is then used to verify the change of email address.
   */
  requestUpdateCustomerEmailAddress: RequestUpdateCustomerEmailAddressResult;
  /**
   * Confirm the update of the emailAddress with the provided token, which has been generated by the
   * `requestUpdateCustomerEmailAddress` mutation.
   */
  updateCustomerEmailAddress: UpdateCustomerEmailAddressResult;
  /** Requests a password reset email to be sent */
  requestPasswordReset?: Maybe<RequestPasswordResetResult>;
  /** Resets a Customer's password based on the provided token */
  resetPassword: ResetPasswordResult;
  addSelectedGiftToOrder: UpdateOrderItemsResult;
  createMolliePaymentIntent: MolliePaymentIntentResult;
  createCoinbasePaymentIntent: Scalars['String'];
};

export type MutationAddItemToOrderArgs = {
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
  customFields?: Maybe<OrderLineCustomFieldsInput>;
};

export type MutationRemoveOrderLineArgs = {
  orderLineId: Scalars['ID'];
};

export type MutationAdjustOrderLineArgs = {
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
  customFields?: Maybe<OrderLineCustomFieldsInput>;
};

export type MutationApplyCouponCodeArgs = {
  couponCode: Scalars['String'];
};

export type MutationRemoveCouponCodeArgs = {
  couponCode: Scalars['String'];
};

export type MutationTransitionOrderToStateArgs = {
  state: Scalars['String'];
};

export type MutationSetOrderShippingAddressArgs = {
  input: CreateAddressInput;
};

export type MutationSetOrderBillingAddressArgs = {
  input: CreateAddressInput;
};

export type MutationSetOrderCustomFieldsArgs = {
  input: UpdateOrderInput;
};

export type MutationSetOrderShippingMethodArgs = {
  shippingMethodId: Array<Scalars['ID']>;
};

export type MutationAddPaymentToOrderArgs = {
  input: PaymentInput;
};

export type MutationSetCustomerForOrderArgs = {
  input: CreateCustomerInput;
};

export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
  rememberMe?: Maybe<Scalars['Boolean']>;
};

export type MutationAuthenticateArgs = {
  input: AuthenticationInput;
  rememberMe?: Maybe<Scalars['Boolean']>;
};

export type MutationRegisterCustomerAccountArgs = {
  input: RegisterCustomerInput;
};

export type MutationRefreshCustomerVerificationArgs = {
  emailAddress: Scalars['String'];
};

export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};

export type MutationCreateCustomerAddressArgs = {
  input: CreateAddressInput;
};

export type MutationUpdateCustomerAddressArgs = {
  input: UpdateAddressInput;
};

export type MutationDeleteCustomerAddressArgs = {
  id: Scalars['ID'];
};

export type MutationVerifyCustomerAccountArgs = {
  token: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type MutationUpdateCustomerPasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type MutationRequestUpdateCustomerEmailAddressArgs = {
  password: Scalars['String'];
  newEmailAddress: Scalars['String'];
};

export type MutationUpdateCustomerEmailAddressArgs = {
  token: Scalars['String'];
};

export type MutationRequestPasswordResetArgs = {
  emailAddress: Scalars['String'];
};

export type MutationResetPasswordArgs = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type MutationAddSelectedGiftToOrderArgs = {
  productVariantId: Scalars['ID'];
};

export type MutationCreateMolliePaymentIntentArgs = {
  input: MolliePaymentIntentInput;
};

export type MyparcelDropOffPoint = {
  __typename?: 'MyparcelDropOffPoint';
  location_code: Scalars['String'];
  location_name: Scalars['String'];
  city: Scalars['String'];
  postal_code: Scalars['String'];
  street: Scalars['String'];
  number: Scalars['String'];
  number_suffix?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['String']>;
  available_days: Array<Scalars['Int']>;
  cut_off_time?: Maybe<Scalars['String']>;
  carrier_id?: Maybe<Scalars['Int']>;
  distance?: Maybe<Scalars['Int']>;
};

export type MyparcelDropOffPointInput = {
  carrierId?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  postalCode: Scalars['String'];
};

export type NativeAuthInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

/** Returned when attempting an operation that relies on the NativeAuthStrategy, if that strategy is not configured. */
export type NativeAuthStrategyError = ErrorResult & {
  __typename?: 'NativeAuthStrategyError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type NativeAuthenticationResult =
  | CurrentUser
  | InvalidCredentialsError
  | NotVerifiedError
  | NativeAuthStrategyError;

/** Returned when attempting to set a negative OrderLine quantity. */
export type NegativeQuantityError = ErrorResult & {
  __typename?: 'NegativeQuantityError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned when invoking a mutation which depends on there being an active Order on the
 * current session.
 */
export type NoActiveOrderError = ErrorResult & {
  __typename?: 'NoActiveOrderError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

/**
 * Returned if `authOptions.requireVerification` is set to `true` (which is the default)
 * and an unverified user attempts to authenticate.
 */
export type NotVerifiedError = ErrorResult & {
  __typename?: 'NotVerifiedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Operators for filtering on a list of Number fields */
export type NumberListOperators = {
  inList: Scalars['Float'];
};

/** Operators for filtering on a Int or Float field */
export type NumberOperators = {
  eq?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  between?: Maybe<NumberRange>;
  isNull?: Maybe<Scalars['Boolean']>;
};

export type NumberRange = {
  start: Scalars['Float'];
  end: Scalars['Float'];
};

export type Order = Node & {
  __typename?: 'Order';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  type: OrderType;
  /**
   * The date & time that the Order was placed, i.e. the Customer
   * completed the checkout and the Order is no longer "active"
   */
  orderPlacedAt?: Maybe<Scalars['DateTime']>;
  /** A unique code for the Order */
  code: Scalars['String'];
  state: Scalars['String'];
  /** An order is active as long as the payment process has not been completed */
  active: Scalars['Boolean'];
  customer?: Maybe<Customer>;
  shippingAddress?: Maybe<OrderAddress>;
  billingAddress?: Maybe<OrderAddress>;
  lines: Array<OrderLine>;
  /**
   * Surcharges are arbitrary modifications to the Order total which are neither
   * ProductVariants nor discounts resulting from applied Promotions. For example,
   * one-off discounts based on customer interaction, or surcharges based on payment
   * methods.
   */
  surcharges: Array<Surcharge>;
  discounts: Array<Discount>;
  /** An array of all coupon codes applied to the Order */
  couponCodes: Array<Scalars['String']>;
  /** Promotions applied to the order. Only gets populated after the payment process has completed. */
  promotions: Array<Promotion>;
  payments?: Maybe<Array<Payment>>;
  fulfillments?: Maybe<Array<Fulfillment>>;
  totalQuantity: Scalars['Int'];
  /**
   * The subTotal is the total of all OrderLines in the Order. This figure also includes any Order-level
   * discounts which have been prorated (proportionally distributed) amongst the items of each OrderLine.
   * To get a total of all OrderLines which does not account for prorated discounts, use the
   * sum of `OrderLine.discountedLinePrice` values.
   */
  subTotal: Scalars['Money'];
  /** Same as subTotal, but inclusive of tax */
  subTotalWithTax: Scalars['Money'];
  currencyCode: CurrencyCode;
  shippingLines: Array<ShippingLine>;
  shipping: Scalars['Money'];
  shippingWithTax: Scalars['Money'];
  /** Equal to subTotal plus shipping */
  total: Scalars['Money'];
  /** The final payable amount. Equal to subTotalWithTax plus shippingWithTax */
  totalWithTax: Scalars['Money'];
  /** A summary of the taxes being applied to this Order */
  taxSummary: Array<OrderTaxSummary>;
  history: HistoryEntryList;
  customFields?: Maybe<OrderCustomFields>;
};

export type OrderHistoryArgs = {
  options?: Maybe<HistoryEntryListOptions>;
};

export type OrderAddress = {
  __typename?: 'OrderAddress';
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1?: Maybe<Scalars['String']>;
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type OrderCustomFields = {
  __typename?: 'OrderCustomFields';
  customerNote?: Maybe<Scalars['String']>;
  referralCode?: Maybe<Scalars['String']>;
  vatId?: Maybe<Scalars['String']>;
  pickupLocationNumber?: Maybe<Scalars['String']>;
  pickupLocationCarrier?: Maybe<Scalars['String']>;
  pickupLocationName?: Maybe<Scalars['String']>;
  pickupLocationStreet?: Maybe<Scalars['String']>;
  pickupLocationHouseNumber?: Maybe<Scalars['String']>;
  pickupLocationZipcode?: Maybe<Scalars['String']>;
  pickupLocationCity?: Maybe<Scalars['String']>;
  pickupLocationCountry?: Maybe<Scalars['String']>;
};

export type OrderFilterParameter = {
  id?: Maybe<IdOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  type?: Maybe<StringOperators>;
  orderPlacedAt?: Maybe<DateOperators>;
  code?: Maybe<StringOperators>;
  state?: Maybe<StringOperators>;
  active?: Maybe<BooleanOperators>;
  totalQuantity?: Maybe<NumberOperators>;
  subTotal?: Maybe<NumberOperators>;
  subTotalWithTax?: Maybe<NumberOperators>;
  currencyCode?: Maybe<StringOperators>;
  shipping?: Maybe<NumberOperators>;
  shippingWithTax?: Maybe<NumberOperators>;
  total?: Maybe<NumberOperators>;
  totalWithTax?: Maybe<NumberOperators>;
  customerNote?: Maybe<StringOperators>;
  referralCode?: Maybe<StringOperators>;
  vatId?: Maybe<StringOperators>;
  pickupLocationNumber?: Maybe<StringOperators>;
  pickupLocationCarrier?: Maybe<StringOperators>;
  pickupLocationName?: Maybe<StringOperators>;
  pickupLocationStreet?: Maybe<StringOperators>;
  pickupLocationHouseNumber?: Maybe<StringOperators>;
  pickupLocationZipcode?: Maybe<StringOperators>;
  pickupLocationCity?: Maybe<StringOperators>;
  pickupLocationCountry?: Maybe<StringOperators>;
};

/** Returned when the maximum order size limit has been reached. */
export type OrderLimitError = ErrorResult & {
  __typename?: 'OrderLimitError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  maxItems: Scalars['Int'];
};

export type OrderLine = Node & {
  __typename?: 'OrderLine';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  featuredAsset?: Maybe<Asset>;
  /** The price of a single unit, excluding tax and discounts */
  unitPrice: Scalars['Money'];
  /** The price of a single unit, including tax but excluding discounts */
  unitPriceWithTax: Scalars['Money'];
  /** Non-zero if the unitPrice has changed since it was initially added to Order */
  unitPriceChangeSinceAdded: Scalars['Money'];
  /** Non-zero if the unitPriceWithTax has changed since it was initially added to Order */
  unitPriceWithTaxChangeSinceAdded: Scalars['Money'];
  /**
   * The price of a single unit including discounts, excluding tax.
   *
   * If Order-level discounts have been applied, this will not be the
   * actual taxable unit price (see `proratedUnitPrice`), but is generally the
   * correct price to display to customers to avoid confusion
   * about the internal handling of distributed Order-level discounts.
   */
  discountedUnitPrice: Scalars['Money'];
  /** The price of a single unit including discounts and tax */
  discountedUnitPriceWithTax: Scalars['Money'];
  /**
   * The actual unit price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
   * and refund calculations.
   */
  proratedUnitPrice: Scalars['Money'];
  /** The proratedUnitPrice including tax */
  proratedUnitPriceWithTax: Scalars['Money'];
  /** The quantity of items purchased */
  quantity: Scalars['Int'];
  /** The quantity at the time the Order was placed */
  orderPlacedQuantity: Scalars['Int'];
  taxRate: Scalars['Float'];
  /** The total price of the line excluding tax and discounts. */
  linePrice: Scalars['Money'];
  /** The total price of the line including tax but excluding discounts. */
  linePriceWithTax: Scalars['Money'];
  /** The price of the line including discounts, excluding tax */
  discountedLinePrice: Scalars['Money'];
  /** The price of the line including discounts and tax */
  discountedLinePriceWithTax: Scalars['Money'];
  /**
   * The actual line price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderLine, and is used in tax
   * and refund calculations.
   */
  proratedLinePrice: Scalars['Money'];
  /** The proratedLinePrice including tax */
  proratedLinePriceWithTax: Scalars['Money'];
  /** The total tax on this line */
  lineTax: Scalars['Money'];
  discounts: Array<Discount>;
  taxLines: Array<TaxLine>;
  order: Order;
  fulfillmentLines?: Maybe<Array<FulfillmentLine>>;
  customFields?: Maybe<OrderLineCustomFields>;
};

export type OrderLineCustomFields = {
  __typename?: 'OrderLineCustomFields';
  isSelectedAsGift?: Maybe<Scalars['Boolean']>;
};

export type OrderLineCustomFieldsInput = {
  isSelectedAsGift?: Maybe<Scalars['Boolean']>;
};

export type OrderList = PaginatedList & {
  __typename?: 'OrderList';
  items: Array<Order>;
  totalItems: Scalars['Int'];
};

export type OrderListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<OrderSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<OrderFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

/** Returned when attempting to modify the contents of an Order that is not in the `AddingItems` state. */
export type OrderModificationError = ErrorResult & {
  __typename?: 'OrderModificationError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to add a Payment to an Order that is not in the `ArrangingPayment` state. */
export type OrderPaymentStateError = ErrorResult & {
  __typename?: 'OrderPaymentStateError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type OrderSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  orderPlacedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  totalQuantity?: Maybe<SortOrder>;
  subTotal?: Maybe<SortOrder>;
  subTotalWithTax?: Maybe<SortOrder>;
  shipping?: Maybe<SortOrder>;
  shippingWithTax?: Maybe<SortOrder>;
  total?: Maybe<SortOrder>;
  totalWithTax?: Maybe<SortOrder>;
  customerNote?: Maybe<SortOrder>;
  referralCode?: Maybe<SortOrder>;
  vatId?: Maybe<SortOrder>;
  pickupLocationNumber?: Maybe<SortOrder>;
  pickupLocationCarrier?: Maybe<SortOrder>;
  pickupLocationName?: Maybe<SortOrder>;
  pickupLocationStreet?: Maybe<SortOrder>;
  pickupLocationHouseNumber?: Maybe<SortOrder>;
  pickupLocationZipcode?: Maybe<SortOrder>;
  pickupLocationCity?: Maybe<SortOrder>;
  pickupLocationCountry?: Maybe<SortOrder>;
};

/** Returned if there is an error in transitioning the Order state */
export type OrderStateTransitionError = ErrorResult & {
  __typename?: 'OrderStateTransitionError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  transitionError: Scalars['String'];
  fromState: Scalars['String'];
  toState: Scalars['String'];
};

/**
 * A summary of the taxes being applied to this order, grouped
 * by taxRate.
 */
export type OrderTaxSummary = {
  __typename?: 'OrderTaxSummary';
  /** A description of this tax */
  description: Scalars['String'];
  /** The taxRate as a percentage */
  taxRate: Scalars['Float'];
  /** The total net price of OrderLines to which this taxRate applies */
  taxBase: Scalars['Money'];
  /** The total tax being applied to the Order at this taxRate */
  taxTotal: Scalars['Money'];
};

export enum OrderType {
  Regular = 'Regular',
  Seller = 'Seller',
  Aggregate = 'Aggregate',
}

export type PaginatedList = {
  items: Array<Node>;
  totalItems: Scalars['Int'];
};

/** Returned when attempting to verify a customer account with a password, when a password has already been set. */
export type PasswordAlreadySetError = ErrorResult & {
  __typename?: 'PasswordAlreadySetError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the token used to reset a Customer's password is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type PasswordResetTokenExpiredError = ErrorResult & {
  __typename?: 'PasswordResetTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the token used to reset a Customer's password is either
 * invalid or does not match any expected tokens.
 */
export type PasswordResetTokenInvalidError = ErrorResult & {
  __typename?: 'PasswordResetTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to register or verify a customer account where the given password fails password validation. */
export type PasswordValidationError = ErrorResult & {
  __typename?: 'PasswordValidationError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  validationErrorMessage: Scalars['String'];
};

export type Payment = Node & {
  __typename?: 'Payment';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  method: Scalars['String'];
  amount: Scalars['Money'];
  state: Scalars['String'];
  transactionId?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  refunds: Array<Refund>;
  metadata?: Maybe<Scalars['JSON']>;
};

/** Returned when a Payment is declined by the payment provider. */
export type PaymentDeclinedError = ErrorResult & {
  __typename?: 'PaymentDeclinedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  paymentErrorMessage: Scalars['String'];
};

/** Returned when a Payment fails due to an error. */
export type PaymentFailedError = ErrorResult & {
  __typename?: 'PaymentFailedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  paymentErrorMessage: Scalars['String'];
};

/** Passed as input to the `addPaymentToOrder` mutation. */
export type PaymentInput = {
  /** This field should correspond to the `code` property of a PaymentMethod. */
  method: Scalars['String'];
  /**
   * This field should contain arbitrary data passed to the specified PaymentMethodHandler's `createPayment()` method
   * as the "metadata" argument. For example, it could contain an ID for the payment and other
   * data generated by the payment provider.
   */
  metadata: Scalars['JSON'];
};

export type PaymentMethod = Node & {
  __typename?: 'PaymentMethod';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  code: Scalars['String'];
  description: Scalars['String'];
  enabled: Scalars['Boolean'];
  checker?: Maybe<ConfigurableOperation>;
  handler: ConfigurableOperation;
  translations: Array<PaymentMethodTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type PaymentMethodQuote = {
  __typename?: 'PaymentMethodQuote';
  id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  isEligible: Scalars['Boolean'];
  eligibilityMessage?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type PaymentMethodTranslation = {
  __typename?: 'PaymentMethodTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  description: Scalars['String'];
};

/**
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 *
 * ## Understanding Permission.Owner
 *
 * `Permission.Owner` is a special permission which is used in some Vendure resolvers to indicate that that resolver should only
 * be accessible to the "owner" of that resource.
 *
 * For example, the Shop API `activeCustomer` query resolver should only return the Customer object for the "owner" of that Customer, i.e.
 * based on the activeUserId of the current session. As a result, the resolver code looks like this:
 *
 * @example
 * ```TypeScript
 * \@Query()
 * \@Allow(Permission.Owner)
 * async activeCustomer(\@Ctx() ctx: RequestContext): Promise<Customer | undefined> {
 *   const userId = ctx.activeUserId;
 *   if (userId) {
 *     return this.customerService.findOneByUserId(ctx, userId);
 *   }
 * }
 * ```
 *
 * Here we can see that the "ownership" must be enforced by custom logic inside the resolver. Since "ownership" cannot be defined generally
 * nor statically encoded at build-time, any resolvers using `Permission.Owner` **must** include logic to enforce that only the owner
 * of the resource has access. If not, then it is the equivalent of using `Permission.Public`.
 *
 *
 * @docsCategory common
 */
export enum Permission {
  /** Authenticated means simply that the user is logged in */
  Authenticated = 'Authenticated',
  /** SuperAdmin has unrestricted access to all operations */
  SuperAdmin = 'SuperAdmin',
  /** Owner means the user owns this entity, e.g. a Customer's own Order */
  Owner = 'Owner',
  /** Public means any unauthenticated user may perform the operation */
  Public = 'Public',
  /** Grants permission to update GlobalSettings */
  UpdateGlobalSettings = 'UpdateGlobalSettings',
  /** Grants permission to create Products, Facets, Assets, Collections */
  CreateCatalog = 'CreateCatalog',
  /** Grants permission to read Products, Facets, Assets, Collections */
  ReadCatalog = 'ReadCatalog',
  /** Grants permission to update Products, Facets, Assets, Collections */
  UpdateCatalog = 'UpdateCatalog',
  /** Grants permission to delete Products, Facets, Assets, Collections */
  DeleteCatalog = 'DeleteCatalog',
  /** Grants permission to create PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  CreateSettings = 'CreateSettings',
  /** Grants permission to read PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  ReadSettings = 'ReadSettings',
  /** Grants permission to update PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  UpdateSettings = 'UpdateSettings',
  /** Grants permission to delete PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  DeleteSettings = 'DeleteSettings',
  /** Grants permission to create Administrator */
  CreateAdministrator = 'CreateAdministrator',
  /** Grants permission to read Administrator */
  ReadAdministrator = 'ReadAdministrator',
  /** Grants permission to update Administrator */
  UpdateAdministrator = 'UpdateAdministrator',
  /** Grants permission to delete Administrator */
  DeleteAdministrator = 'DeleteAdministrator',
  /** Grants permission to create Asset */
  CreateAsset = 'CreateAsset',
  /** Grants permission to read Asset */
  ReadAsset = 'ReadAsset',
  /** Grants permission to update Asset */
  UpdateAsset = 'UpdateAsset',
  /** Grants permission to delete Asset */
  DeleteAsset = 'DeleteAsset',
  /** Grants permission to create Channel */
  CreateChannel = 'CreateChannel',
  /** Grants permission to read Channel */
  ReadChannel = 'ReadChannel',
  /** Grants permission to update Channel */
  UpdateChannel = 'UpdateChannel',
  /** Grants permission to delete Channel */
  DeleteChannel = 'DeleteChannel',
  /** Grants permission to create Collection */
  CreateCollection = 'CreateCollection',
  /** Grants permission to read Collection */
  ReadCollection = 'ReadCollection',
  /** Grants permission to update Collection */
  UpdateCollection = 'UpdateCollection',
  /** Grants permission to delete Collection */
  DeleteCollection = 'DeleteCollection',
  /** Grants permission to create Country */
  CreateCountry = 'CreateCountry',
  /** Grants permission to read Country */
  ReadCountry = 'ReadCountry',
  /** Grants permission to update Country */
  UpdateCountry = 'UpdateCountry',
  /** Grants permission to delete Country */
  DeleteCountry = 'DeleteCountry',
  /** Grants permission to create Customer */
  CreateCustomer = 'CreateCustomer',
  /** Grants permission to read Customer */
  ReadCustomer = 'ReadCustomer',
  /** Grants permission to update Customer */
  UpdateCustomer = 'UpdateCustomer',
  /** Grants permission to delete Customer */
  DeleteCustomer = 'DeleteCustomer',
  /** Grants permission to create CustomerGroup */
  CreateCustomerGroup = 'CreateCustomerGroup',
  /** Grants permission to read CustomerGroup */
  ReadCustomerGroup = 'ReadCustomerGroup',
  /** Grants permission to update CustomerGroup */
  UpdateCustomerGroup = 'UpdateCustomerGroup',
  /** Grants permission to delete CustomerGroup */
  DeleteCustomerGroup = 'DeleteCustomerGroup',
  /** Grants permission to create Facet */
  CreateFacet = 'CreateFacet',
  /** Grants permission to read Facet */
  ReadFacet = 'ReadFacet',
  /** Grants permission to update Facet */
  UpdateFacet = 'UpdateFacet',
  /** Grants permission to delete Facet */
  DeleteFacet = 'DeleteFacet',
  /** Grants permission to create Order */
  CreateOrder = 'CreateOrder',
  /** Grants permission to read Order */
  ReadOrder = 'ReadOrder',
  /** Grants permission to update Order */
  UpdateOrder = 'UpdateOrder',
  /** Grants permission to delete Order */
  DeleteOrder = 'DeleteOrder',
  /** Grants permission to create PaymentMethod */
  CreatePaymentMethod = 'CreatePaymentMethod',
  /** Grants permission to read PaymentMethod */
  ReadPaymentMethod = 'ReadPaymentMethod',
  /** Grants permission to update PaymentMethod */
  UpdatePaymentMethod = 'UpdatePaymentMethod',
  /** Grants permission to delete PaymentMethod */
  DeletePaymentMethod = 'DeletePaymentMethod',
  /** Grants permission to create Product */
  CreateProduct = 'CreateProduct',
  /** Grants permission to read Product */
  ReadProduct = 'ReadProduct',
  /** Grants permission to update Product */
  UpdateProduct = 'UpdateProduct',
  /** Grants permission to delete Product */
  DeleteProduct = 'DeleteProduct',
  /** Grants permission to create Promotion */
  CreatePromotion = 'CreatePromotion',
  /** Grants permission to read Promotion */
  ReadPromotion = 'ReadPromotion',
  /** Grants permission to update Promotion */
  UpdatePromotion = 'UpdatePromotion',
  /** Grants permission to delete Promotion */
  DeletePromotion = 'DeletePromotion',
  /** Grants permission to create ShippingMethod */
  CreateShippingMethod = 'CreateShippingMethod',
  /** Grants permission to read ShippingMethod */
  ReadShippingMethod = 'ReadShippingMethod',
  /** Grants permission to update ShippingMethod */
  UpdateShippingMethod = 'UpdateShippingMethod',
  /** Grants permission to delete ShippingMethod */
  DeleteShippingMethod = 'DeleteShippingMethod',
  /** Grants permission to create Tag */
  CreateTag = 'CreateTag',
  /** Grants permission to read Tag */
  ReadTag = 'ReadTag',
  /** Grants permission to update Tag */
  UpdateTag = 'UpdateTag',
  /** Grants permission to delete Tag */
  DeleteTag = 'DeleteTag',
  /** Grants permission to create TaxCategory */
  CreateTaxCategory = 'CreateTaxCategory',
  /** Grants permission to read TaxCategory */
  ReadTaxCategory = 'ReadTaxCategory',
  /** Grants permission to update TaxCategory */
  UpdateTaxCategory = 'UpdateTaxCategory',
  /** Grants permission to delete TaxCategory */
  DeleteTaxCategory = 'DeleteTaxCategory',
  /** Grants permission to create TaxRate */
  CreateTaxRate = 'CreateTaxRate',
  /** Grants permission to read TaxRate */
  ReadTaxRate = 'ReadTaxRate',
  /** Grants permission to update TaxRate */
  UpdateTaxRate = 'UpdateTaxRate',
  /** Grants permission to delete TaxRate */
  DeleteTaxRate = 'DeleteTaxRate',
  /** Grants permission to create Seller */
  CreateSeller = 'CreateSeller',
  /** Grants permission to read Seller */
  ReadSeller = 'ReadSeller',
  /** Grants permission to update Seller */
  UpdateSeller = 'UpdateSeller',
  /** Grants permission to delete Seller */
  DeleteSeller = 'DeleteSeller',
  /** Grants permission to create StockLocation */
  CreateStockLocation = 'CreateStockLocation',
  /** Grants permission to read StockLocation */
  ReadStockLocation = 'ReadStockLocation',
  /** Grants permission to update StockLocation */
  UpdateStockLocation = 'UpdateStockLocation',
  /** Grants permission to delete StockLocation */
  DeleteStockLocation = 'DeleteStockLocation',
  /** Grants permission to create System */
  CreateSystem = 'CreateSystem',
  /** Grants permission to read System */
  ReadSystem = 'ReadSystem',
  /** Grants permission to update System */
  UpdateSystem = 'UpdateSystem',
  /** Grants permission to delete System */
  DeleteSystem = 'DeleteSystem',
  /** Grants permission to create Zone */
  CreateZone = 'CreateZone',
  /** Grants permission to read Zone */
  ReadZone = 'ReadZone',
  /** Grants permission to update Zone */
  UpdateZone = 'UpdateZone',
  /** Grants permission to delete Zone */
  DeleteZone = 'DeleteZone',
  /** Allows enabling e-Boekhouden plugin */
  EBoekhouden = 'eBoekhouden',
  /** Allow this user to enable invoice generation */
  AllowInvoicesPermission = 'AllowInvoicesPermission',
  /** Allows setting a webhook URL */
  SetWebhook = 'SetWebhook',
  /** Allows setting MyParcel configurations */
  SetMyparcelConfig = 'SetMyparcelConfig',
  /** Allows setting Goedgepickt configurations */
  SetGoedgepicktConfig = 'SetGoedgepicktConfig',
  /** Allows administrator to export orders */
  ExportOrders = 'ExportOrders',
  /** Allows setting SendCloud configuration */
  SetSendCloudConfig = 'SetSendCloudConfig',
}

/** The price range where the result has more than one price */
export type PriceRange = {
  __typename?: 'PriceRange';
  min: Scalars['Money'];
  max: Scalars['Money'];
};

export type Product = Node & {
  __typename?: 'Product';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
  featuredAsset?: Maybe<Asset>;
  assets: Array<Asset>;
  /** Returns all ProductVariants */
  variants: Array<ProductVariant>;
  /** Returns a paginated, sortable, filterable list of ProductVariants */
  variantList: ProductVariantList;
  optionGroups: Array<ProductOptionGroup>;
  facetValues: Array<FacetValue>;
  translations: Array<ProductTranslation>;
  collections: Array<Collection>;
  customFields?: Maybe<ProductCustomFields>;
};

export type ProductVariantListArgs = {
  options?: Maybe<ProductVariantListOptions>;
};

export type ProductCustomFields = {
  __typename?: 'ProductCustomFields';
  metaTitle?: Maybe<Scalars['String']>;
  metaDescription?: Maybe<Scalars['String']>;
  keywords?: Maybe<Scalars['String']>;
  hsCode?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
};

export type ProductFilterParameter = {
  id?: Maybe<IdOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  slug?: Maybe<StringOperators>;
  description?: Maybe<StringOperators>;
  metaTitle?: Maybe<StringOperators>;
  metaDescription?: Maybe<StringOperators>;
  keywords?: Maybe<StringOperators>;
  hsCode?: Maybe<StringOperators>;
  price?: Maybe<NumberOperators>;
  weight?: Maybe<NumberOperators>;
};

export type ProductList = PaginatedList & {
  __typename?: 'ProductList';
  items: Array<Product>;
  totalItems: Scalars['Int'];
};

export type ProductListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<ProductSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<ProductFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type ProductOption = Node & {
  __typename?: 'ProductOption';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  code: Scalars['String'];
  name: Scalars['String'];
  groupId: Scalars['ID'];
  group: ProductOptionGroup;
  translations: Array<ProductOptionTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ProductOptionGroup = Node & {
  __typename?: 'ProductOptionGroup';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  code: Scalars['String'];
  name: Scalars['String'];
  options: Array<ProductOption>;
  translations: Array<ProductOptionGroupTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ProductOptionGroupTranslation = {
  __typename?: 'ProductOptionGroupTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type ProductOptionTranslation = {
  __typename?: 'ProductOptionTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type ProductSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  slug?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  metaTitle?: Maybe<SortOrder>;
  metaDescription?: Maybe<SortOrder>;
  keywords?: Maybe<SortOrder>;
  hsCode?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
  weight?: Maybe<SortOrder>;
};

export type ProductTranslation = {
  __typename?: 'ProductTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
  customFields?: Maybe<ProductTranslationCustomFields>;
};

export type ProductTranslationCustomFields = {
  __typename?: 'ProductTranslationCustomFields';
  metaTitle?: Maybe<Scalars['String']>;
  metaDescription?: Maybe<Scalars['String']>;
  keywords?: Maybe<Scalars['String']>;
};

export type ProductVariant = Node & {
  __typename?: 'ProductVariant';
  id: Scalars['ID'];
  product: Product;
  productId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  sku: Scalars['String'];
  name: Scalars['String'];
  featuredAsset?: Maybe<Asset>;
  assets: Array<Asset>;
  price: Scalars['Money'];
  currencyCode: CurrencyCode;
  priceWithTax: Scalars['Money'];
  stockLevel: Scalars['String'];
  taxRateApplied: TaxRate;
  taxCategory: TaxCategory;
  options: Array<ProductOption>;
  facetValues: Array<FacetValue>;
  translations: Array<ProductVariantTranslation>;
  customFields?: Maybe<ProductVariantCustomFields>;
};

export type ProductVariantCustomFields = {
  __typename?: 'ProductVariantCustomFields';
  maxPerOrder?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
};

export type ProductVariantFilterParameter = {
  id?: Maybe<IdOperators>;
  productId?: Maybe<IdOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  sku?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  price?: Maybe<NumberOperators>;
  currencyCode?: Maybe<StringOperators>;
  priceWithTax?: Maybe<NumberOperators>;
  stockLevel?: Maybe<StringOperators>;
  maxPerOrder?: Maybe<NumberOperators>;
  weight?: Maybe<NumberOperators>;
};

export type ProductVariantList = PaginatedList & {
  __typename?: 'ProductVariantList';
  items: Array<ProductVariant>;
  totalItems: Scalars['Int'];
};

export type ProductVariantListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<ProductVariantSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<ProductVariantFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type ProductVariantSortParameter = {
  id?: Maybe<SortOrder>;
  productId?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  sku?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
  priceWithTax?: Maybe<SortOrder>;
  stockLevel?: Maybe<SortOrder>;
  maxPerOrder?: Maybe<SortOrder>;
  weight?: Maybe<SortOrder>;
};

export type ProductVariantTranslation = {
  __typename?: 'ProductVariantTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type Promotion = Node & {
  __typename?: 'Promotion';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  startsAt?: Maybe<Scalars['DateTime']>;
  endsAt?: Maybe<Scalars['DateTime']>;
  couponCode?: Maybe<Scalars['String']>;
  perCustomerUsageLimit?: Maybe<Scalars['Int']>;
  usageLimit?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  description: Scalars['String'];
  enabled: Scalars['Boolean'];
  conditions: Array<ConfigurableOperation>;
  actions: Array<ConfigurableOperation>;
  translations: Array<PromotionTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type PromotionList = PaginatedList & {
  __typename?: 'PromotionList';
  items: Array<Promotion>;
  totalItems: Scalars['Int'];
};

export type PromotionTranslation = {
  __typename?: 'PromotionTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  description: Scalars['String'];
};

export type Province = Region &
  Node & {
    __typename?: 'Province';
    id: Scalars['ID'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    languageCode: LanguageCode;
    code: Scalars['String'];
    type: Scalars['String'];
    name: Scalars['String'];
    enabled: Scalars['Boolean'];
    parent?: Maybe<Region>;
    parentId?: Maybe<Scalars['ID']>;
    translations: Array<RegionTranslation>;
    customFields?: Maybe<Scalars['JSON']>;
  };

export type ProvinceList = PaginatedList & {
  __typename?: 'ProvinceList';
  items: Array<Province>;
  totalItems: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  /** The active Channel */
  activeChannel: Channel;
  /** The active Customer */
  activeCustomer?: Maybe<Customer>;
  /**
   * The active Order. Will be `null` until an Order is created via `addItemToOrder`. Once an Order reaches the
   * state of `PaymentAuthorized` or `PaymentSettled`, then that Order is no longer considered "active" and this
   * query will once again return `null`.
   */
  activeOrder?: Maybe<Order>;
  /** An array of supported Countries */
  availableCountries: Array<Country>;
  /** A list of Collections available to the shop */
  collections: CollectionList;
  /** Returns a Collection either by its id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
  collection?: Maybe<Collection>;
  /** Returns a list of eligible shipping methods based on the current active Order */
  eligibleShippingMethods: Array<ShippingMethodQuote>;
  /** Returns a list of payment methods and their eligibility based on the current active Order */
  eligiblePaymentMethods: Array<PaymentMethodQuote>;
  /** A list of Facets available to the shop */
  facets: FacetList;
  /** Returns a Facet by its id */
  facet?: Maybe<Facet>;
  /** Returns information about the current authenticated User */
  me?: Maybe<CurrentUser>;
  /** Returns the possible next states that the activeOrder can transition to */
  nextOrderStates: Array<Scalars['String']>;
  /**
   * Returns an Order based on the id. Note that in the Shop API, only orders belonging to the
   * currently-authenticated User may be queried.
   */
  order?: Maybe<Order>;
  /**
   * Returns an Order based on the order `code`. For guest Orders (i.e. Orders placed by non-authenticated Customers)
   * this query will only return the Order within 2 hours of the Order being placed. This allows an Order confirmation
   * screen to be shown immediately after completion of a guest checkout, yet prevents security risks of allowing
   * general anonymous access to Order data.
   */
  orderByCode?: Maybe<Order>;
  /** Get a Product either by id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
  product?: Maybe<Product>;
  /** Get a list of Products */
  products: ProductList;
  /** Search Products based on the criteria set by the `SearchInput` */
  search: SearchResponse;
  eligibleGifts: Array<ProductVariant>;
  dutchAddressLookup?: Maybe<DutchAddressLookupResult>;
  molliePaymentMethods: Array<MolliePaymentMethod>;
  myparcelDropOffPoints: Array<MyparcelDropOffPoint>;
};

export type QueryCollectionsArgs = {
  options?: Maybe<CollectionListOptions>;
};

export type QueryCollectionArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};

export type QueryFacetsArgs = {
  options?: Maybe<FacetListOptions>;
};

export type QueryFacetArgs = {
  id: Scalars['ID'];
};

export type QueryOrderArgs = {
  id: Scalars['ID'];
};

export type QueryOrderByCodeArgs = {
  code: Scalars['String'];
};

export type QueryProductArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};

export type QueryProductsArgs = {
  options?: Maybe<ProductListOptions>;
};

export type QuerySearchArgs = {
  input: SearchInput;
};

export type QueryDutchAddressLookupArgs = {
  input: DutchPostalCodeInput;
};

export type QueryMolliePaymentMethodsArgs = {
  input: MolliePaymentMethodsInput;
};

export type QueryMyparcelDropOffPointsArgs = {
  input: MyparcelDropOffPointInput;
};

export type RefreshCustomerVerificationResult =
  | Success
  | NativeAuthStrategyError;

export type Refund = Node & {
  __typename?: 'Refund';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  items: Scalars['Money'];
  shipping: Scalars['Money'];
  adjustment: Scalars['Money'];
  total: Scalars['Money'];
  method?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  transactionId?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  lines: Array<RefundLine>;
  paymentId: Scalars['ID'];
  metadata?: Maybe<Scalars['JSON']>;
};

export type RefundLine = {
  __typename?: 'RefundLine';
  orderLine: OrderLine;
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
  refund: Refund;
  refundId: Scalars['ID'];
};

export type Region = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  code: Scalars['String'];
  type: Scalars['String'];
  name: Scalars['String'];
  enabled: Scalars['Boolean'];
  parent?: Maybe<Region>;
  parentId?: Maybe<Scalars['ID']>;
  translations: Array<RegionTranslation>;
};

export type RegionTranslation = {
  __typename?: 'RegionTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type RegisterCustomerAccountResult =
  | Success
  | MissingPasswordError
  | PasswordValidationError
  | NativeAuthStrategyError;

export type RegisterCustomerInput = {
  emailAddress: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type RelationCustomFieldConfig = CustomField & {
  __typename?: 'RelationCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  entity: Scalars['String'];
  scalarFields: Array<Scalars['String']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type RemoveOrderItemsResult = Order | OrderModificationError;

export type RequestPasswordResetResult = Success | NativeAuthStrategyError;

export type RequestUpdateCustomerEmailAddressResult =
  | Success
  | InvalidCredentialsError
  | EmailAddressConflictError
  | NativeAuthStrategyError;

export type ResetPasswordResult =
  | CurrentUser
  | PasswordResetTokenInvalidError
  | PasswordResetTokenExpiredError
  | PasswordValidationError
  | NativeAuthStrategyError
  | NotVerifiedError;

export type Role = Node & {
  __typename?: 'Role';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  code: Scalars['String'];
  description: Scalars['String'];
  permissions: Array<Permission>;
  channels: Array<Channel>;
};

export type RoleList = PaginatedList & {
  __typename?: 'RoleList';
  items: Array<Role>;
  totalItems: Scalars['Int'];
};

export type SearchInput = {
  term?: Maybe<Scalars['String']>;
  facetValueFilters?: Maybe<Array<FacetValueFilterInput>>;
  collectionId?: Maybe<Scalars['ID']>;
  collectionSlug?: Maybe<Scalars['String']>;
  groupByProduct?: Maybe<Scalars['Boolean']>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<SearchResultSortParameter>;
};

export type SearchReindexResponse = {
  __typename?: 'SearchReindexResponse';
  success: Scalars['Boolean'];
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  items: Array<SearchResult>;
  totalItems: Scalars['Int'];
  facetValues: Array<FacetValueResult>;
  collections: Array<CollectionResult>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  sku: Scalars['String'];
  slug: Scalars['String'];
  productId: Scalars['ID'];
  productName: Scalars['String'];
  productAsset?: Maybe<SearchResultAsset>;
  productVariantId: Scalars['ID'];
  productVariantName: Scalars['String'];
  productVariantAsset?: Maybe<SearchResultAsset>;
  price: SearchResultPrice;
  priceWithTax: SearchResultPrice;
  currencyCode: CurrencyCode;
  description: Scalars['String'];
  facetIds: Array<Scalars['ID']>;
  facetValueIds: Array<Scalars['ID']>;
  /** An array of ids of the Collections in which this result appears */
  collectionIds: Array<Scalars['ID']>;
  /** A relevance score for the result. Differs between database implementations */
  score: Scalars['Float'];
};

export type SearchResultAsset = {
  __typename?: 'SearchResultAsset';
  id: Scalars['ID'];
  preview: Scalars['String'];
  focalPoint?: Maybe<Coordinate>;
};

/** The price of a search result product, either as a range or as a single price */
export type SearchResultPrice = PriceRange | SinglePrice;

export type SearchResultSortParameter = {
  name?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
};

export type Seller = Node & {
  __typename?: 'Seller';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  customFields?: Maybe<Scalars['JSON']>;
};

export type SetCustomerForOrderResult =
  | Order
  | AlreadyLoggedInError
  | EmailAddressConflictError
  | NoActiveOrderError
  | GuestCheckoutError;

export type SetOrderShippingMethodResult =
  | Order
  | OrderModificationError
  | IneligibleShippingMethodError
  | NoActiveOrderError;

export type ShippingLine = {
  __typename?: 'ShippingLine';
  id: Scalars['ID'];
  shippingMethod: ShippingMethod;
  price: Scalars['Money'];
  priceWithTax: Scalars['Money'];
  discountedPrice: Scalars['Money'];
  discountedPriceWithTax: Scalars['Money'];
  discounts: Array<Discount>;
};

export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  code: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  fulfillmentHandlerCode: Scalars['String'];
  checker: ConfigurableOperation;
  calculator: ConfigurableOperation;
  translations: Array<ShippingMethodTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ShippingMethodList = PaginatedList & {
  __typename?: 'ShippingMethodList';
  items: Array<ShippingMethod>;
  totalItems: Scalars['Int'];
};

export type ShippingMethodQuote = {
  __typename?: 'ShippingMethodQuote';
  id: Scalars['ID'];
  price: Scalars['Money'];
  priceWithTax: Scalars['Money'];
  code: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  /** Any optional metadata returned by the ShippingCalculator in the ShippingCalculationResult */
  metadata?: Maybe<Scalars['JSON']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ShippingMethodTranslation = {
  __typename?: 'ShippingMethodTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  description: Scalars['String'];
};

/** The price value where the result has a single price */
export type SinglePrice = {
  __typename?: 'SinglePrice';
  value: Scalars['Money'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type StringCustomFieldConfig = CustomField & {
  __typename?: 'StringCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  length?: Maybe<Scalars['Int']>;
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  pattern?: Maybe<Scalars['String']>;
  options?: Maybe<Array<StringFieldOption>>;
  ui?: Maybe<Scalars['JSON']>;
};

export type StringFieldOption = {
  __typename?: 'StringFieldOption';
  value: Scalars['String'];
  label?: Maybe<Array<LocalizedString>>;
};

/** Operators for filtering on a list of String fields */
export type StringListOperators = {
  inList: Scalars['String'];
};

/** Operators for filtering on a String field */
export type StringOperators = {
  eq?: Maybe<Scalars['String']>;
  notEq?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  notContains?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  regex?: Maybe<Scalars['String']>;
  isNull?: Maybe<Scalars['Boolean']>;
};

/** Indicates that an operation succeeded, where we do not want to return any more specific information. */
export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean'];
};

export type Surcharge = Node & {
  __typename?: 'Surcharge';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  description: Scalars['String'];
  sku?: Maybe<Scalars['String']>;
  taxLines: Array<TaxLine>;
  price: Scalars['Money'];
  priceWithTax: Scalars['Money'];
  taxRate: Scalars['Float'];
};

export type Tag = Node & {
  __typename?: 'Tag';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['String'];
};

export type TagList = PaginatedList & {
  __typename?: 'TagList';
  items: Array<Tag>;
  totalItems: Scalars['Int'];
};

export type TaxCategory = Node & {
  __typename?: 'TaxCategory';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  isDefault: Scalars['Boolean'];
  customFields?: Maybe<Scalars['JSON']>;
};

export type TaxLine = {
  __typename?: 'TaxLine';
  description: Scalars['String'];
  taxRate: Scalars['Float'];
};

export type TaxRate = Node & {
  __typename?: 'TaxRate';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  enabled: Scalars['Boolean'];
  value: Scalars['Float'];
  category: TaxCategory;
  zone: Zone;
  customerGroup?: Maybe<CustomerGroup>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type TaxRateList = PaginatedList & {
  __typename?: 'TaxRateList';
  items: Array<TaxRate>;
  totalItems: Scalars['Int'];
};

export type TextCustomFieldConfig = CustomField & {
  __typename?: 'TextCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type TransitionOrderToStateResult = Order | OrderStateTransitionError;

export type UpdateAddressInput = {
  id: Scalars['ID'];
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1?: Maybe<Scalars['String']>;
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  defaultShippingAddress?: Maybe<Scalars['Boolean']>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateCustomerEmailAddressResult =
  | Success
  | IdentifierChangeTokenInvalidError
  | IdentifierChangeTokenExpiredError
  | NativeAuthStrategyError;

export type UpdateCustomerInput = {
  title?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateCustomerPasswordResult =
  | Success
  | InvalidCredentialsError
  | PasswordValidationError
  | NativeAuthStrategyError;

export type UpdateOrderCustomFieldsInput = {
  customerNote?: Maybe<Scalars['String']>;
  referralCode?: Maybe<Scalars['String']>;
  vatId?: Maybe<Scalars['String']>;
  pickupLocationNumber?: Maybe<Scalars['String']>;
  pickupLocationCarrier?: Maybe<Scalars['String']>;
  pickupLocationName?: Maybe<Scalars['String']>;
  pickupLocationStreet?: Maybe<Scalars['String']>;
  pickupLocationHouseNumber?: Maybe<Scalars['String']>;
  pickupLocationZipcode?: Maybe<Scalars['String']>;
  pickupLocationCity?: Maybe<Scalars['String']>;
  pickupLocationCountry?: Maybe<Scalars['String']>;
};

export type UpdateOrderInput = {
  customFields?: Maybe<UpdateOrderCustomFieldsInput>;
};

export type UpdateOrderItemsResult =
  | Order
  | OrderModificationError
  | OrderLimitError
  | NegativeQuantityError
  | InsufficientStockError;

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  identifier: Scalars['String'];
  verified: Scalars['Boolean'];
  roles: Array<Role>;
  lastLogin?: Maybe<Scalars['DateTime']>;
  authenticationMethods: Array<AuthenticationMethod>;
  customFields?: Maybe<Scalars['JSON']>;
};

/**
 * Returned if the verification token (used to verify a Customer's email address) is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type VerificationTokenExpiredError = ErrorResult & {
  __typename?: 'VerificationTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the verification token (used to verify a Customer's email address) is either
 * invalid or does not match any expected tokens.
 */
export type VerificationTokenInvalidError = ErrorResult & {
  __typename?: 'VerificationTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type VerifyCustomerAccountResult =
  | CurrentUser
  | VerificationTokenInvalidError
  | VerificationTokenExpiredError
  | MissingPasswordError
  | PasswordValidationError
  | PasswordAlreadySetError
  | NativeAuthStrategyError;

export type Zone = Node & {
  __typename?: 'Zone';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  members: Array<Region>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ProductFieldsFragment = { __typename?: 'Product' } & Pick<
  Product,
  'id' | 'name' | 'slug' | 'description'
> & {
    assets: Array<
      { __typename?: 'Asset' } & Pick<Asset, 'id' | 'preview' | 'thumbnail'>
    >;
    facetValues: Array<
      { __typename?: 'FacetValue' } & Pick<FacetValue, 'code' | 'name'> & {
          facet: { __typename?: 'Facet' } & Pick<Facet, 'code' | 'name'>;
        }
    >;
    featuredAsset?: Maybe<
      { __typename?: 'Asset' } & Pick<Asset, 'id' | 'preview' | 'thumbnail'>
    >;
    variants: Array<
      { __typename?: 'ProductVariant' } & Pick<
        ProductVariant,
        'id' | 'name' | 'priceWithTax' | 'productId' | 'stockLevel'
      > & {
          options: Array<
            { __typename?: 'ProductOption' } & Pick<
              ProductOption,
              'id' | 'name'
            > & {
                group: { __typename?: 'ProductOptionGroup' } & Pick<
                  ProductOptionGroup,
                  'id' | 'name'
                >;
              }
          >;
          assets: Array<
            { __typename?: 'Asset' } & Pick<
              Asset,
              'id' | 'preview' | 'thumbnail'
            >
          >;
          featuredAsset?: Maybe<
            { __typename?: 'Asset' } & Pick<
              Asset,
              'id' | 'preview' | 'thumbnail'
            >
          >;
          customFields?: Maybe<
            { __typename?: 'ProductVariantCustomFields' } & Pick<
              ProductVariantCustomFields,
              'maxPerOrder'
            >
          >;
        }
    >;
    customFields?: Maybe<
      { __typename?: 'ProductCustomFields' } & Pick<
        ProductCustomFields,
        'metaTitle' | 'metaDescription' | 'keywords'
      >
    >;
  };

export type CollectionFieldsFragment = { __typename?: 'Collection' } & Pick<
  Collection,
  'id' | 'name' | 'slug' | 'description'
> & {
    parent?: Maybe<
      { __typename?: 'Collection' } & Pick<Collection, 'id' | 'name' | 'slug'>
    >;
    children?: Maybe<
      Array<
        { __typename?: 'Collection' } & Pick<Collection, 'id' | 'name' | 'slug'>
      >
    >;
    featuredAsset?: Maybe<
      { __typename?: 'Asset' } & Pick<Asset, 'preview' | 'thumbnail'>
    >;
    productVariants: { __typename?: 'ProductVariantList' } & {
      items: Array<
        { __typename?: 'ProductVariant' } & {
          product: { __typename?: 'Product' } & Pick<Product, 'id'>;
        }
      >;
    };
  };

export type OrderFieldsFragment = { __typename?: 'Order' } & Pick<
  Order,
  | 'id'
  | 'code'
  | 'state'
  | 'active'
  | 'totalWithTax'
  | 'subTotalWithTax'
  | 'shippingWithTax'
  | 'couponCodes'
> & {
    customer?: Maybe<
      { __typename?: 'Customer' } & Pick<
        Customer,
        'id' | 'firstName' | 'lastName' | 'phoneNumber' | 'emailAddress'
      >
    >;
    shippingAddress?: Maybe<
      { __typename?: 'OrderAddress' } & Pick<
        OrderAddress,
        | 'fullName'
        | 'company'
        | 'streetLine1'
        | 'streetLine2'
        | 'city'
        | 'postalCode'
        | 'country'
      >
    >;
    billingAddress?: Maybe<
      { __typename?: 'OrderAddress' } & Pick<
        OrderAddress,
        | 'fullName'
        | 'company'
        | 'streetLine1'
        | 'streetLine2'
        | 'city'
        | 'postalCode'
        | 'country'
      >
    >;
    shippingLines: Array<
      { __typename?: 'ShippingLine' } & Pick<ShippingLine, 'priceWithTax'> & {
          shippingMethod: { __typename?: 'ShippingMethod' } & Pick<
            ShippingMethod,
            'id' | 'code' | 'name'
          >;
        }
    >;
    lines: Array<
      { __typename?: 'OrderLine' } & Pick<
        OrderLine,
        'id' | 'quantity' | 'linePriceWithTax'
      > & {
          featuredAsset?: Maybe<
            { __typename?: 'Asset' } & Pick<
              Asset,
              'id' | 'preview' | 'thumbnail'
            >
          >;
          productVariant: { __typename?: 'ProductVariant' } & Pick<
            ProductVariant,
            'id' | 'sku' | 'name' | 'priceWithTax'
          >;
        }
    >;
    taxSummary: Array<
      { __typename?: 'OrderTaxSummary' } & Pick<
        OrderTaxSummary,
        'taxRate' | 'taxTotal' | 'taxBase'
      >
    >;
    payments?: Maybe<
      Array<
        { __typename?: 'Payment' } & Pick<
          Payment,
          'id' | 'state' | 'errorMessage' | 'metadata'
        >
      >
    >;
    discounts: Array<
      { __typename?: 'Discount' } & Pick<
        Discount,
        'description' | 'amountWithTax'
      >
    >;
  };

export type StockLevelProductsQueryVariables = Exact<{
  options?: Maybe<ProductListOptions>;
}>;

export type StockLevelProductsQuery = { __typename?: 'Query' } & {
  products: { __typename?: 'ProductList' } & {
    items: Array<
      { __typename?: 'Product' } & Pick<Product, 'id' | 'slug'> & {
          variants: Array<
            { __typename?: 'ProductVariant' } & Pick<
              ProductVariant,
              'id' | 'stockLevel' | 'priceWithTax'
            >
          >;
        }
    >;
  };
};

export type ProductQueryVariables = Exact<{
  slug?: Maybe<Scalars['String']>;
}>;

export type ProductQuery = { __typename?: 'Query' } & {
  product?: Maybe<{ __typename?: 'Product' } & ProductFieldsFragment>;
};

export type AdditemToOrderMutationVariables = Exact<{
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
}>;

export type AdditemToOrderMutation = { __typename?: 'Mutation' } & {
  addItemToOrder:
    | ({ __typename?: 'Order' } & OrderFieldsFragment)
    | ({ __typename?: 'OrderModificationError' } & Pick<
        OrderModificationError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'OrderLimitError' } & Pick<
        OrderLimitError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'NegativeQuantityError' } & Pick<
        NegativeQuantityError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'InsufficientStockError' } & Pick<
        InsufficientStockError,
        'errorCode' | 'message'
      >);
};

export type ActiveOrderQueryVariables = Exact<{ [key: string]: never }>;

export type ActiveOrderQuery = { __typename?: 'Query' } & {
  activeOrder?: Maybe<{ __typename?: 'Order' } & OrderFieldsFragment>;
};

export type EligibleShippingMethodsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type EligibleShippingMethodsQuery = { __typename?: 'Query' } & {
  eligibleShippingMethods: Array<
    { __typename?: 'ShippingMethodQuote' } & Pick<
      ShippingMethodQuote,
      | 'id'
      | 'price'
      | 'priceWithTax'
      | 'name'
      | 'code'
      | 'description'
      | 'metadata'
    >
  >;
};

export type SetOrderShippingMethodMutationVariables = Exact<{
  shippingMethodId: Scalars['ID'];
}>;

export type SetOrderShippingMethodMutation = { __typename?: 'Mutation' } & {
  setOrderShippingMethod:
    | ({ __typename?: 'Order' } & OrderFieldsFragment)
    | ({ __typename?: 'OrderModificationError' } & Pick<
        OrderModificationError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'IneligibleShippingMethodError' } & Pick<
        IneligibleShippingMethodError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'NoActiveOrderError' } & Pick<
        NoActiveOrderError,
        'errorCode' | 'message'
      >);
};

export type AdjustOrderLineMutationVariables = Exact<{
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
}>;

export type AdjustOrderLineMutation = { __typename?: 'Mutation' } & {
  adjustOrderLine:
    | ({ __typename?: 'Order' } & OrderFieldsFragment)
    | ({ __typename?: 'OrderModificationError' } & Pick<
        OrderModificationError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'OrderLimitError' } & Pick<
        OrderLimitError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'NegativeQuantityError' } & Pick<
        NegativeQuantityError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'InsufficientStockError' } & Pick<
        InsufficientStockError,
        'errorCode' | 'message'
      >);
};

export type SetCustomerForOrderMutationVariables = Exact<{
  input: CreateCustomerInput;
}>;

export type SetCustomerForOrderMutation = { __typename?: 'Mutation' } & {
  setCustomerForOrder:
    | ({ __typename?: 'Order' } & OrderFieldsFragment)
    | ({ __typename?: 'AlreadyLoggedInError' } & Pick<
        AlreadyLoggedInError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'EmailAddressConflictError' } & Pick<
        EmailAddressConflictError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'NoActiveOrderError' } & Pick<
        NoActiveOrderError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'GuestCheckoutError' } & Pick<
        GuestCheckoutError,
        'errorCode' | 'message'
      >);
};

export type SetOrderShippingAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;

export type SetOrderShippingAddressMutation = { __typename?: 'Mutation' } & {
  setOrderShippingAddress:
    | ({ __typename?: 'Order' } & OrderFieldsFragment)
    | ({ __typename?: 'NoActiveOrderError' } & Pick<
        NoActiveOrderError,
        'errorCode' | 'message'
      >);
};

export type SetOrderBillingAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;

export type SetOrderBillingAddressMutation = { __typename?: 'Mutation' } & {
  setOrderBillingAddress:
    | ({ __typename?: 'Order' } & OrderFieldsFragment)
    | ({ __typename?: 'NoActiveOrderError' } & Pick<
        NoActiveOrderError,
        'errorCode' | 'message'
      >);
};

export type SetOrderCustomFieldsMutationVariables = Exact<{
  input: UpdateOrderInput;
}>;

export type SetOrderCustomFieldsMutation = { __typename?: 'Mutation' } & {
  setOrderCustomFields:
    | ({ __typename?: 'Order' } & OrderFieldsFragment)
    | ({ __typename?: 'NoActiveOrderError' } & Pick<
        NoActiveOrderError,
        'errorCode' | 'message'
      >);
};

export type NextOrderStatesQueryVariables = Exact<{ [key: string]: never }>;

export type NextOrderStatesQuery = { __typename?: 'Query' } & Pick<
  Query,
  'nextOrderStates'
>;

export type TransitionOrderToStateMutationVariables = Exact<{
  state: Scalars['String'];
}>;

export type TransitionOrderToStateMutation = { __typename?: 'Mutation' } & {
  transitionOrderToState?: Maybe<
    | ({ __typename?: 'Order' } & OrderFieldsFragment)
    | ({ __typename?: 'OrderStateTransitionError' } & Pick<
        OrderStateTransitionError,
        'errorCode' | 'message'
      >)
  >;
};

export type CreateMolliePaymentIntentMutationVariables = Exact<{
  input: MolliePaymentIntentInput;
}>;

export type CreateMolliePaymentIntentMutation = { __typename?: 'Mutation' } & {
  createMolliePaymentIntent:
    | ({ __typename?: 'MolliePaymentIntent' } & Pick<
        MolliePaymentIntent,
        'url'
      >)
    | ({ __typename?: 'MolliePaymentIntentError' } & Pick<
        MolliePaymentIntentError,
        'errorCode' | 'message'
      >);
};

export type CreateCoinbasePaymentIntentMutationVariables = Exact<{
  [key: string]: never;
}>;

export type CreateCoinbasePaymentIntentMutation = {
  __typename?: 'Mutation';
} & Pick<Mutation, 'createCoinbasePaymentIntent'>;

export type OrderByCodeQueryVariables = Exact<{
  code: Scalars['String'];
}>;

export type OrderByCodeQuery = { __typename?: 'Query' } & {
  orderByCode?: Maybe<{ __typename?: 'Order' } & OrderFieldsFragment>;
};

export type DutchAddressLookupQueryVariables = Exact<{
  input: DutchPostalCodeInput;
}>;

export type DutchAddressLookupQuery = { __typename?: 'Query' } & {
  dutchAddressLookup?: Maybe<
    { __typename?: 'DutchAddressLookupResult' } & Pick<
      DutchAddressLookupResult,
      'street' | 'city'
    >
  >;
};

export type ApplyCouponCodeMutationVariables = Exact<{
  couponCode: Scalars['String'];
}>;

export type ApplyCouponCodeMutation = { __typename?: 'Mutation' } & {
  applyCouponCode:
    | ({ __typename?: 'Order' } & OrderFieldsFragment)
    | ({ __typename?: 'CouponCodeExpiredError' } & Pick<
        CouponCodeExpiredError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'CouponCodeInvalidError' } & Pick<
        CouponCodeInvalidError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'CouponCodeLimitError' } & Pick<
        CouponCodeLimitError,
        'errorCode' | 'message'
      >);
};

export type RemoveAllOrderLinesMutationVariables = Exact<{
  [key: string]: never;
}>;

export type RemoveAllOrderLinesMutation = { __typename?: 'Mutation' } & {
  removeAllOrderLines:
    | ({ __typename?: 'Order' } & OrderFieldsFragment)
    | ({ __typename?: 'OrderModificationError' } & Pick<
        OrderModificationError,
        'errorCode' | 'message'
      >);
};

export type RemoveCouponCodeMutationVariables = Exact<{
  couponCode: Scalars['String'];
}>;

export type RemoveCouponCodeMutation = { __typename?: 'Mutation' } & {
  removeCouponCode?: Maybe<{ __typename?: 'Order' } & OrderFieldsFragment>;
};

export type MyparcelDropOffPointsQueryVariables = Exact<{
  input: MyparcelDropOffPointInput;
}>;

export type MyparcelDropOffPointsQuery = { __typename?: 'Query' } & {
  myparcelDropOffPoints: Array<
    { __typename?: 'MyparcelDropOffPoint' } & Pick<
      MyparcelDropOffPoint,
      | 'location_code'
      | 'location_name'
      | 'city'
      | 'postal_code'
      | 'street'
      | 'number'
      | 'number_suffix'
      | 'phone'
      | 'reference'
      | 'available_days'
      | 'cut_off_time'
      | 'distance'
      | 'carrier_id'
    >
  >;
};

export type SetPickupLocationOnOrderMutationVariables = Exact<{
  customFields?: Maybe<UpdateOrderCustomFieldsInput>;
}>;

export type SetPickupLocationOnOrderMutation = { __typename?: 'Mutation' } & {
  setOrderCustomFields:
    | ({ __typename?: 'Order' } & OrderFieldsFragment)
    | ({ __typename?: 'NoActiveOrderError' } & Pick<
        NoActiveOrderError,
        'errorCode' | 'message'
      >);
};

export type CollectionsQueryVariables = Exact<{ [key: string]: never }>;

export type CollectionsQuery = { __typename?: 'Query' } & {
  collections: { __typename?: 'CollectionList' } & {
    items: Array<{ __typename?: 'Collection' } & CollectionFieldsFragment>;
  };
};

export type AllProductsQueryVariables = Exact<{
  options?: Maybe<ProductListOptions>;
}>;

export type AllProductsQuery = { __typename?: 'Query' } & {
  products: { __typename?: 'ProductList' } & Pick<ProductList, 'totalItems'> & {
      items: Array<{ __typename?: 'Product' } & ProductFieldsFragment>;
    };
};

export type AvailableCountriesQueryVariables = Exact<{ [key: string]: never }>;

export type AvailableCountriesQuery = { __typename?: 'Query' } & {
  availableCountries: Array<
    { __typename?: 'Country' } & Pick<Country, 'name' | 'code'>
  >;
};

export type EligibleGiftsQueryVariables = Exact<{ [key: string]: never }>;

export type EligibleGiftsQuery = { __typename?: 'Query' } & {
  eligibleGifts: Array<
    { __typename?: 'ProductVariant' } & Pick<
      ProductVariant,
      'id' | 'name' | 'priceWithTax'
    > & {
        product: { __typename?: 'Product' } & Pick<Product, 'name'> & {
            featuredAsset?: Maybe<
              { __typename?: 'Asset' } & Pick<
                Asset,
                'id' | 'preview' | 'thumbnail'
              >
            >;
          };
        featuredAsset?: Maybe<
          { __typename?: 'Asset' } & Pick<Asset, 'id' | 'preview' | 'thumbnail'>
        >;
      }
  >;
};

export type AddSelectedGiftToOrderMutationVariables = Exact<{
  productVariantId: Scalars['ID'];
}>;

export type AddSelectedGiftToOrderMutation = { __typename?: 'Mutation' } & {
  addSelectedGiftToOrder:
    | ({ __typename?: 'Order' } & OrderFieldsFragment)
    | ({ __typename?: 'OrderModificationError' } & Pick<
        OrderModificationError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'OrderLimitError' } & Pick<
        OrderLimitError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'NegativeQuantityError' } & Pick<
        NegativeQuantityError,
        'errorCode' | 'message'
      >)
    | ({ __typename?: 'InsufficientStockError' } & Pick<
        InsufficientStockError,
        'errorCode' | 'message'
      >);
};
