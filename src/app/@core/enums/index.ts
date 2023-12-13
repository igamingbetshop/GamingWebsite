export enum Products
{
  PLATFORM = 1,
  SPORTSBOOK = 6,
  TVBET = 22001
}

export enum BonusTypes
{
  CASH_BACK = 1,
  FREE_SPIN = 2,
  AFFILIATE = 3,
  NTH_DEPOSIT_WAGER_SPORT = 4,
  SIGN_UP = 5,
  NTH_DEPOSIT_WAGER_CASINO = 6,
  PROMO_WAGER_CASINO = 7,
  SPIN = 8,
  PROMO_WAGER_SPORT = 9
}

export enum VerificationCodeTypes
{
  MobileNumberVerification = 1,
  EmailVerification = 2,
  PasswordRecoveryByEmail = 3,
  PasswordRecoveryByMobile = 4,
  WithdrawByEmail = 5,
  WithdrawByMobile = 6,
  AddBankAccountByEmail = 7,
  AddBankAccountByMobile = 8,
  PasswordChangeByEmail = 9,
  PasswordChangeByMobile = 10,
  SecurityQuestionChangeByEmail = 11,
  SecurityQuestionChangeByMobile = 12,
  USSDPinChangeByEmail = 13,
  USSDPinChangeByMobile = 14,
  PasswordRecoveryByEmailOrMobile = 15
}


export enum Controllers
{
  CLIENT = "Client",
  DOCUMENT = "Document",
  MAIN = "Main",
  PRODUCT = "Product"
}

export enum Methods
{
  API_REQUEST = "ApiRequest",
  ACTIVATE_PROMO_CODE = "ActivatePromoCode",
  DELETE_TICKET = "DeleteTicket",
  CLOSE_TICKET = "CloseTicket",
  CREATE_MESSAGE = "CreateMessage",
  GET_IMAGES = "GetImages",
  GET_BET_STATES = "GetBetStates",
  GET_PRODUCT_GROUP = "GetProductGroups",
  GET_BONUS_BETS = "GetBonusBets",
  GET_GAMES = "GetGames",
  GET_GAME_PROVIDERS = "GetGameProviders",
  GET_CLIENT_BONUS_TRIGGERS = "GetClientBonusTriggers",
  GET_BONUSES = "GetBonuses",
  GET_BONUS_Balance = "GetBonusBalance",
  GET_BETS_HISTORY = "GetBetsHistory",
  CHANGE_NICK_NAME = "ChangeNickName",
  GET_DEPOSIT_BONUS_INFO = "GetDepositBonusInfo",
  GET_WELCOME_BONUS = "GetWelcomeBonus",
  DELETE_BONUS = "CancelClientBonus",
  GET_CLIENT_STATES = "GetClientStates",
  GET_CLIENT_BALANCE = "GetClientBalance",
  GET_CLIENT_TICKETS = "GetClientTickets",
  GET_CLIENT_ACCOUNTS = "GetClientAccounts",
  GET_CLIENT_INFO = "GetClientInfo",
  GET_FRIENDS = "GetAffiliateClientsOfManager",
  GET_PAYMENT_BANKS = "GetPaymentBanks",
  GET_PARTNER_CUSTOMER_BANKS = "GetPartnerCustomerBanks",
  GET_BANKS_ACCOUNT_TYPES = "GetBankAccountTypes",
  GET_PAYMENT_ACCOUNT_TYPES = "GetPaymentAccountTypes",
  GET_PAYMENT_REQUEST_STATES = "GetPaymentRequestStates",
  GET_PAYMENT_REQUEST_TYPES = "GetPaymentRequestTypes",
  GET_PAYMENT_REQUESTS = "GetPaymentRequests",
  GET_PARTNER_SPECIAL_PRODUCTS = "GetPartnerSpecialProducts",
  GET_PARTNER_PAYMENT_SYSTEMS = "GetPartnerPaymentSystems",
  GET_PARTNER_BET_SHOPS = "GetPartnerBetShops",
  GET_PRODUCT_URL = "GetProductUrl",
  GET_REGIONS = "GetRegions",
  GET_PRODUCT_INFO = "GetProductInfo",
  GET_TICKET_MESSAGES = "GetTicketMessages",
  GET_TRANSACTION_HISTORY = "GetTransactionHistory",
  GET_OPERATION_TYPES = "GetOperationTypes",
  GET_CLIENT_FAVORITE_PRODUCTS = "GetClientFavoriteProducts",
  REMOVE_CLIENT_FAVORITE_PRODUCT = "RemoveClientFavoriteProduct",
  GET_PROMOTIONS = "GetPromotions",
  ADD_TO_FAVORITE_LIST = "AddToFavoriteList",
  Get_Create_Payment_Request = "CreatePaymentRequest",
  Get_Create_Deposit_Request = "CreateDepositRequest",
  GET_CLIENT_BANK_ACCOUNTS = "GetClientBankAccounts",
  GET_CLIENT_PAYMENT_METHODS = "GetClientPaymentMethods",
  INVITE_FRIEND = "InviteFriend",
  LOGIN_CLIENT = "LoginClient",
  LOGOUT_CLIENT = "LogoutClient",
  OPEN_TICKET = "OpenTicket",
  QUICK_EMAIL_REGISTRACION = "QuickEmailRegistration",
  QUICK_SMS_REGISTRACION = "QuickSmsRegistration",
  REGISTER_CLIENT = "RegisterClient",
  RECOVER_PASSWORD = "RecoverPassword",
  SEND_VERIFICATION_CODE_TO_EMAIL = "SendVerificationCodeToEmail",
  SEND_VERIFICATION_CODE_TO_MOBILE_NUMBER = "SendVerificationCodeToMobileNumber",
  SEND_ACCOUNT_DETAILS_VERIFICATION_CODE = "SendAccountDetailsVerificationCode",
  SEND_RECOVERY_TOKEN = "SendRecoveryToken",
  SEND_SMS_CODE = "SendSMSCode",
  SEND_EMAIL_CODE = "SendEmailCode",
  VERIFY_EMAIL_CODE = "VerifyEmailCode",
  VERIFY_CLIENT_EMAIL = "VerifyClientEmail",
  GET_SECURITY_QUESTIONS = "GetSecurityQuestions",
  VERIFY_SMS_CODE = "VerifySMSCode",
  VERIFY_CLIENT_MOBILE_NUMBER = "VerifyClientMobileNumber",
  CANCEL_PAYMENT = "CancelPaymentRequest",
  CHANGE_CLIENT_PASSWORD = "ChangeClientPassword",
  ACCEPT_TERMS_CONDITIONS  = "AcceptTermsConditions",
  GET_SESSIONINFO = "GetSessionInfo",
  UPDATE_SECURITY_QUESTIONS = "UpdateSecurityAnswers",
  APPLY_SELF_EXCLUSION = "ApplySelfExclusion",
  KYC_DOCUMENT_TYPES_ENUM = "GetKYCDocumentTypesEnum",
  KYC_DOCUMENT_STATES_ENUM = "GetKYCDocumentStatesEnum",
  GET_BONUS_STATUS_ENUM = "GetBonusStatusesEnum",
  CLIENT_IDENTITYMODELS = "GetClientIdentityModels",
  GET_CLIENT_STATUSES = "GetClientStatuses",
  UPLOAD_IMAGE = "UploadImage",
  CHANGE_CLIENT_DETAILS = "ChangeClientDetails",
  ADD_BANK_ACCOUNT = "AddBankAccount",
  REMOVE_PAYMENT_ACCOUNT = "RemovePaymentAccount",
  GET_ANNOUNCEMENTS = "GetAnnouncements",
  SET_LIMITS = "SetLimits",
  GET_LIMITS = "GetLimits",
  CLIME_TO_CAMPAIGN_BONUS = "ClaimToCompainBonus",
  SPEND_COMPLIMENTARY_POINTS  = "SpendComplimentaryPoints",
  /*CLIME_TO_CAMPAIGN_BONUS = "ClaimToCompainBonus",*/
  GET_PARTNER_PRODUCT_INFO = "GetPartnerProductInfo",
  EXPORT_BETS_HISTORY = "ExportBetsHistory",
  REGISTER_AFFILIATE = "RegisterAffiliate",
  CHANGE_CLIENT_USSD_PIN = "ChangeClientUSSDPin",
  GET_TICKER = 'GetTicker',
  GET_DEPOSIT_LIMITS = 'GetDepositLimits',
  ADD_WALLET_NUMBER = "AddWalletNumber",
  GET_CLIENT_PAYMENT_INFO_STATES = "GetClientPaymentInfoStates",
  ENABLE_CLIENT_TWO_FACTOR = "EnableClientTwoFactor",
  DISABLE_CLIENT_TWO_FACTOR = "DisableClientTwoFactor",
  GENERATE_QR_CODE = "GenerateQRCode",
  GET_CLIENT_WALLETS = "GetClientWallets",
  REMOVE_PAYMENT_WALLETS = "RemovePaymentAccount",
  DISABLE_CLIENT_ACCOUNT = "DisableClientAccount",
  GET_CHARACTERS = "GetCharacters",
  GET_CHARACTER_CURRENT_STATE = "GetCharacterCurrentState",
  GET_CHARACTERS_HIERARCHY = "GetCharacterHierarchy",
  ADD_CHARACTER_TO_CLIENT = "AddCharacterToClient",
  GET_VERIFICATION_PAGE_URL = "GetVerificationPageUrl",
  SELECT_SESSION_ACCOUNT = "SelectSessionAccount"
}

export enum DateTypes
{
  SHORT = "HH:mm",
  LONG = "HH:mm dd/MM/yyyy"
}

export enum BannerTypes
{
  HOME = 1,
  VIRTUAL_GAMES = 2,
  CASINO = 3,
  LIVE_CASINO = 4,
  SKILL_GAMES = 5,
  MOBILE_HOME = 6,
  MOBILE_VIRTUAL_GAMES = 7,
  MOBILE_CASINO = 8,
  MOBILE_LIVE_CASINO = 9,
  MOBILE_SKILL_GAMES= 10
}

export enum RegisterTypes
{
  FULL = "Full-Register",
  QUICK = "Quick-Register",
  QUICK_EMAIL = "Email",
  QUICK_MOBILE = "Mobile",
}


export enum RegionTypes {
  Street = 1,
  District = 2,
  City = 3,
  Region = 4,
  Country = 5,
  Continent = 6,
  Mainland = 7
}

export enum MenuType
{
  ACCOUNT_TAB_LIST = "AccountTabsList",
  CASINO_MENU = "CasinoMenu",
  FOOTER_MENU = "FooterMenu",
  Mobile_FOOTER_MENU = "MobileFooterMenu",
  GENERAL_MENU = "GeneralMenu",
  MOBILE_MENU = "MobileMenu",
  MOBILE_RIGHT_SIDEBAR = "MobileRightSidebar",
  MOBILE_BOTTOM_MENU = "MobileBottomMenu",
  MOBILE_CENTRAL_MENU = "MobileCentralMenu",
  NEWS_MENU = "NewsMenu",
  REGISTRATION = "Registration",
  LIVE_CASINO = "LiveCasinoMenu",
  HEADER_PANEL_2_MENU = "HeaderPanel2Menu",
  HEADER_PANEL_1_MENU = "HeaderPanel1Menu"
}

export enum VerificationTypes
{
  EMAIL = "email",
  MOBILE = "mobile"
}

export enum FragmentPositions {
  Casino = 'casino' ,
  LiveCasino = 'livecasino',
  Games = 'games',
  MyCasino = 'mycasino',
  Home = 'home',
  Category = 'category'
}

export enum FragmentTypes {
  Banners = 'Banners',
  Categories = 'Categories',
  Menus = 'Menus',
  Providers = 'Providers',
  ProgressBars = 'ProgressBars',
  CharacterHierarchy = 'CharacterHierarchies'
}
export enum FragmentType {
  Banner = 'banner',
  Category = 'category',
  Menu = 'menu',
  Provider = 'provider',
  ProgressBar = 'progressBar',
  CharacterHierarchy = 'CharacterHierarchy'
}


export enum FragmentSource
{
  Web = 'WebFragments',
  Mobile = 'MobileFragments'
}
