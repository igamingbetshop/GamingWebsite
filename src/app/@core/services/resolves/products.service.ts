import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ConfigService} from '../app/config.service';
import {GetJackpotService} from "@core/services/api/getJackpot.service";
import {DeviceDetectorService} from "ngx-device-detector";
import {environment} from "../../../../environments/environment";

export interface casinoDataType {
    games: any[],
    providers: any[]
}

@Injectable()
export class ProductsResolve implements Resolve<any> {
    constructor(public configService: ConfigService, public getJackpotService: GetJackpotService,
                private deviceService: DeviceDetectorService) {
    }


    resolve(route: ActivatedRouteSnapshot): Promise<any> | any {
        let filteredCategoryItem = this.configService.settings['ProductCategories'].filter((subItem: any) => subItem.Type == route.data.url_data);
        let input = {
            'PageIndex': 0,
            'PageSize': 22,
            'WithWidget': !this.deviceService.isMobile(),
            'CategoryId': filteredCategoryItem.length ? filteredCategoryItem[0]['Id'] : null,
            'ProviderId': null,
            'IsForMobile': this.deviceService.isMobile(),
            'Name': ''
        };
//         return Promise.all([this.configService.products, this.configService.settings]).then((data: any) => {
//
//             // console.log(data[0].items, 'data casino games');
// console.log(data[1], 'categori data')
//             return data[0];
//         });

        return this.getJackpotService.getcasinoGames(input).subscribe((data: any) => {
            let casinoGamesData:casinoDataType = {
                games: [],
                providers: []
            };

            if (data['ResponseCode'] === 0) {
                for (let i = 0; i < data['ResponseObject']['Games'].length; i++) {
                    const product = {
                        gameImage: data['ResponseObject']['Games'][i]["i"].startsWith('http') ? data['ResponseObject']['Games'][i]["i"] : 'https://resources.' + environment.hostName + '/products/' + data['ResponseObject']['Games'][i]["i"],
                        backgroundImage: data['ResponseObject']['Games'][i]["bi"].startsWith('http') ? data['ResponseObject']['Games'][i]["bi"] : 'https://resources.' + environment.hostName + '/products/' + data['ResponseObject']['Games'][i]["bi"],
                        name: data['ResponseObject']['Games'][i]["n"],
                        hasDemo: data['ResponseObject']['Games'][i]["hd"],
                        nickName: data['ResponseObject']['Games'][i]["nn"],
                        openMode: data['ResponseObject']['Games'][i]["o"],
                        productId: data['ResponseObject']['Games'][i]["p"],
                        providerId: data['ResponseObject']['Games'][i]["s"],
                        providerName: data['ResponseObject']['Games'][i]["sp"],
                        rating:data['ResponseObject']['Games'][i]["r"],
                        jackpotValue: data['ResponseObject']['Games'][i]["jp"],
                        subproviderId: data['ResponseObject']['Games'][i]["ss"],
                        subproviderName: data['ResponseObject']['Games'][i]["sn"]
                    };

                    casinoGamesData.games.push(product);
                }

                casinoGamesData.providers= data['ResponseObject']['Providers'];
                return casinoGamesData;
            }

        });
    }

}
