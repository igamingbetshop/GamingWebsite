import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';

@Injectable()
export class UtilityService {


    /*
    ** Date of BirthDay variables
    */

    public cYear = new Date().getFullYear();
    public cMonth = new Date().getMonth();
    public cDay = new Date().getDate();

    public Years: Array<any> = [];
    public Months: Array<any> = [];
    public Days: Array<any> = [];

    delay: number;


    public months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    public daysSource = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];


    constructor(public configService: ConfigService) {
        const delayFromConfig = Number(this.configService.defaultOptions['ErrorDisplayTime']);
        this.delay = delayFromConfig || 3000;
    }


    public removeDuplicates(myArr, prop) {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }

    // removeDuplicates(originalArray, prop) {
    //   var newArray = [];
    //   var lookupObject  = {};
    //
    //   for(var i in originalArray) {
    //     lookupObject[originalArray[i][prop]] = originalArray[i];
    //   }
    //
    //   for(i in lookupObject) {
    //     newArray.push(lookupObject[i]);
    //   }
    //   return newArray;
    // }


    /*
    * * Get Password Recovery url key
    */

    public getParsedUrl(location: string): any {
        let params = parseUrl(location.substr(location.toString().indexOf('?')));

        function parseUrl(url: string) {
            let params = {}, p;

            url = decodeURI(url).replace('?', '');

            p = url.split('&');

            for (let i = 0; i < p.length; i++) {

                let s = p[i].split('=');
                params[s[0]] = s[1];
            }

            return params;
        }

        return params;
    }

    public GetTimeZone() {
        const d = new Date();
        return -1 * d.getTimezoneOffset() / 60;
    }

    public showError(errorMessage: string, source: any, optionalPropertyName?: string, optionalPropertyValue?: string) {
        source.errorMessage = errorMessage;
        let timeoutId = setTimeout(() => {
            source.errorMessage = '';
            if (optionalPropertyName)
                source[optionalPropertyName] = '';
            clearTimeout(timeoutId);
        }, 3000);
    }


    public showErrorDynamicallyInTime(errorMessage: string, source: any, optionalPropertyName?: string, optionalPropertyValue?: string, timeOut: number = this.configService.defaultOptions['ErrorDisplayTime'] != undefined ? JSON.parse(this.configService.defaultOptions['ErrorDisplayTime']) : 3000) {
        source.errorMessage = errorMessage;
        let timeoutId = setTimeout(() => {
            source.errorMessage = '';
            if (optionalPropertyName)
                source[optionalPropertyName] = '';
            clearTimeout(timeoutId);
        }, timeOut);
    }

    public showMessageWithDelay(source: any, args: any[]) {
        return new Promise(resolve =>
        {
            args.forEach(item =>
            {
                Object.keys(item).forEach(key => {
                    source[key] = item[key]
                })
            });
            let timeoutId = setTimeout(() =>
            {
                args.forEach(item =>
                {
                    Object.keys(item).forEach(key => {
                        source[key] = "";
                    })
                });
                clearTimeout(timeoutId);
                resolve(true);
            }, this.delay);
        });
    }

    /*
    ** Date of Birthday Data
    */

    getYearsList() {
        const year = this.configService.defaultOptions,
            allowedAge = year.AllowedAge;
        for (let j = this.cYear - allowedAge; j >= this.cYear - (100 + allowedAge); j--) {
            this.Years.push(j);
        }

        return this.Years;
    }


    public changeYear(yearItem)
    {
        this.Months.length = 0;
        for (let k = 0; k < (yearItem == this.Years[0] ? this.cMonth + 1 : this.months.length); k++) {
            this.Months.push({Name: this.months[k], Id: k + 1});
        }
        return this.Months;
    }

    /*
    *  Number of days in a specified month
    */

    public days(month, year) {
        return new Date(year, month, 0).getDate();
    }

    public changeMonth(yearItem, monthItem) {
        this.Days.length = 0;
        const dayMaxCount = this.days(monthItem, yearItem);

        for (let i = 1; i <= ((monthItem == this.Months[this.Months.length - 1].Id && yearItem == this.Years[0]) ? Math.min(dayMaxCount, this.cDay) : dayMaxCount); i++) {
            this.Days.push(i);
        }
        return this.Days;
    }


    public checkAllowedAge(birthDay, birthMonth, birthYear) {
        if(!birthDay || !birthMonth || !birthYear)
            return false;

        const year = this.configService.defaultOptions, allowedAge = year.AllowedAge;
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        if(currentYear - allowedAge > birthYear)
            return false;
        if(currentYear - allowedAge < birthYear)
            return true;

        if(currentMonth + 1 > birthMonth)
            return false;
        if(currentMonth + 1 < birthMonth)
            return true;

        if(currentDate.getDay() + 1 >= birthDay)
            return false;

        return true;
    }


    array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    };

    /**
     **  Format Numbers
     **/

    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


}
