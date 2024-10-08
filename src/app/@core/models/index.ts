export class Request {
    Controller: string;
    Method: string;
    Token: string;
    PartnerId: string;
    RequestData: any;
    ClientId: number;
    Loader: boolean = true;
    TimeZone: number;
    Type: string;
    PaymentInfo: any;
    ProductId: number;
    LanguageId: string;
    TypeId: number;
    Barcode: number;
    Index: number;
    ActivationKey: string;
    MobileNumber: string;
    Code: string;
    IsForDemo: boolean;
    IsForMobile: boolean;
    Position: string;
    DeviceType: number;
    CategoryId:number;
    PageIndex:number;
    PageSize:number;
    ProviderIds:number[];
    CategoryIds:number[];
    Pattern?: string;
    Name?: string;
    Email?: string;
}

export class TicketMessage {
    Message: string;
    TicketId: number;
    CreationTime: Date;
    IsFromUser: boolean;
    Type: number;
}

export class Ticket {
    Id: number;
    Status: number;
    Type: number;
    Subject: string;
    Message: string;
    CreationTime: Date;
    StatusName: string;
    UnreadMessagesCount: number;
    Email?: string;
}

export class Trigger {
    Name: string;
    Description: string;
    Type: number;
    TypeName: string;
    StartTime: Date;
    FinishTime: Date;
    Percent: number;
    Status: number;
    StatusName: string;
    BetCount: number;
    MinBetCount: number;
    WageringAmount: number;
    MinAmount: number;
}

export class Bonus {
    BonusId: number;
    Amount: number;
    BonusPercent: number;
    AwardingTime: number;
    CalculationTime: number;
    CreationTime: string;
    Id: number;
    MinCoeff: number;
    SelectionsMinCount: number;
    SelectionsMaxCount: number;
    SettingId: number;
    State: number;
    TurnoverAmountLeft: number;
    TurnoverCount: number;
    StateName: any;
    FinalAmount;
    TypeName;
    TypeId: number;
    TypeIdActive: boolean;
    Opened: boolean;
    Triggers: Array<Trigger>;
    IsCampaign: boolean;
    Name: string;
    PlayerId: number;
    ReuseNumber:number;
    StatusId:number;
}

export class BonusBet {
    Amount: number;
    Balance: number;
    BetDate: Date;
    BetSelections: Array<any>;
    BetType: number;
    Coefficient: number;
    CurrentLimit: number;
    Description: string;
    GameId: number;
    GameName: string;
    Id: number;
    Info: string;
    Method: any;
    PlayerBonusId: number;
    ResponseCode: number;
    ResponseObject: any;
    Status: number;
    SystemOutCount: null
    TicketNumber: number;
    TransactionId: number;
    WinAmount: number;
}

export class Balance {
    AvailableBalance: string;
    Balances: Array<any>;
    CurrencyId: string;
    UsedBalance: string;
    UnusedBalance: string;
    BookingBalance: string;
    AffiliateManagerBalance: string;
    BonusBalance: string;
    TotalBalance: string;
}

export class User {
    Address: string;
    BirthDate: Date;
    CallToPhone: boolean;
    CategoryId: number;
    CategoryName: string;
    CreationTime: Date;
    CurrencyId: string;
    CharacterId:number;

    CurrencySymbol: string;

    Description: string;
    DocumentIssuedBy: string;
    DocumentNumber: string;
    Email: string;
    EmailOrMobile: string;
    FirstName: string;
    Gender: number;
    Id: number;
    Info: string;
    InformedFrom: string;
    IsAffiliateManager: boolean;
    IsDocumentVerified: boolean;
    IsEmailVerified: boolean;
    IsMobileNumberVerified: boolean;
    LanguageId: string;
    LastName: string;
    LastUpdateTime: Date;
    MobileNumber: string;
    PartnerId: number;
    Password: string;
    PhoneNumber: string;
    PromoCode: string;
    RegionId: number;
    RegistrationIp: string;
    ResponseCode: number;
    ResponseObject: any;
    SecurityAnswer: string;
    SecurityQestionText: string;
    SecurityQuestionId: string;
    SendMail: boolean;
    SendPromotions: boolean;
    SendSms: boolean;
    SessionId: 0;
    Token: string;
    IsAgent:boolean;
    UserName: string;
    WelcomeBonusActivationKey: string;
    ZipCode: string;
}

export class PromotionFragment
{
    Id:number;
    Title:string;
    ImageName:string;
    Order:string;
    StyleType:string;
    Style:any;
    Promotions:Promotion[];
}

export class Promotion {
    Id: number;
    ParentId:number;
    Title: string;
    Content: string;
    Description: string;
    Date: string;
    ImageName: string;
    Type: string;
    StyleType:any;
    Style:any;
}

export class Character {
    Id: number;
    PartnerId:number;
    NickName:string;
    Title: string;
    Description: string;
    Status:number;
    Order:number;
    ImageData:string;
}
export class CharacterHierarchy
{
    Id: number;
    PartnerId:number;
    ParentId:number;
    Level:number;
    NickName:string;
    Title: string;
    Description: string;
    Status:number;
    Order:number;
    ImageUrl:string;
    CreationTime:string;
    CompPoints:number;
    Selected:boolean;
    BackgroundImageData:string;
}
export class CharacterHierarchySource {
    Parent:CharacterHierarchy;
    Children:CharacterHierarchy[];
}

export class CharacterState {
    Id: number;
    PartnerId:number;
    Level:number;
    NickName:string;
    Title: string;
    Description: string;
    Status:number;
    Order:number;
    ImageData:string;
    CreationTime:string;
    CompPoints: number;
    Children: [];
}
export class CharacterStateSourse {
    Parent:CharacterState;
    Previous:CharacterState;
    Next:CharacterState;
    Current: number
}

export class NewsFragment
{
    Id:number;
    Title:string;
    ImageName:string;
    Order:string;
    StyleType:string;
    Description: string;
    Date: string;
    Style:any;
    News:News[];
}

export class News {
    Id: number;
    Title: string;
    Content: string;
    Description: string;
    StartDate: string;
    ImageName: string;
    Type:string;
    StyleType:string;
    Style:any;
    DeltaTime;
}

export class BankAccount {
    Id: string;
    ClientId: string;
    NickName: string;
    ClientName: string;
    CardNumber: string;
    CardExpireDate: string;
    BankName: string;
    Iban: string;
    BankAccountNumber: string;
    BankAccountTypeName: string;
    BankAccountType: string;
    Type: string;
}

export class Product {
    Id: number;
    Name: string;
}
export class ProductIno {
    Name: string;
    Profit:number;
    RTP:number;
    Turnover:number;
    Volatility:string;
    Tags:string;
    IsFavorite: boolean;
}

export class Fragment
{
    Items: FragmentData[];
    Order: number;
    Position:string;
    Title:string;
}

export class FragmentData
{
    Id: number;
    Order: number;
    Position:string;
    Title:string;
    Href:string;
    Src:string;
    ImageName:string;
    Config:any;
    NickName:string;
    State:string;
    Items:any[];
    SubMenu:any[];
}

export class ActiveTournaments
{
    Id:number;
    PartnerId:number;
    Name:string;
    StartTime:string;
    FinishTime:string;
    Info: string;
}

export class ISegment {
    [key: string]: any;
    numbers: INumbers[];
    temporalUnits: string;
}

export class INumbers {
    displayTop: any;
    displayBottom: any;
    overlayTop: any;
    overlayBottom: any;
}

export class ITimeRemaining {
    [key: string]: any;
    complete: any;
    Seconds: any;
    Minutes: any;
    Hours: any;
    Days: any;
}

export class PartnerCurrency {
    CurrentRate: number;
    Id: any;
    Name: any;
    Symbol: any;
    Type: any;
    Balance: number;
}
