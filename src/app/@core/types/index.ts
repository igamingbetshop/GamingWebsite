export type Currency = {
    Id:string;
    Symbol:string;
    Name:string;
    CurrentRate:number;
    ImageUrl:string;
    Type:1 | 2;
    Account?:Account | null;
}

export type Account = {
    Id:number | null;
    TypeId:number;
    Balance:number;
    WithdrawableBalance:number;
    CurrencyId:string;
    CurrencySymbol:string;
    AccountTypeName:string;
    PaymentSystemName:string | null;
    BetShopId:number | null;
    PaymentSystemId:number | null;
    CreationTime:Date;
}

export type Wallet = {
    Currency:Currency;
    Accounts:Account[];
    Balance:number;
}

export type WalletSettings = {
    Wallet:Wallet;
    HideZero:boolean;
    DisplayInFiat:boolean;
}