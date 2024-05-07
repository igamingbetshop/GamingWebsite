import {environment} from "../../environments/environment";
import * as JsEncryptModule from 'jsencrypt';
import {ConfigService} from "@core/services";

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxDV6Tkh5noY4NWUd5G3q
mdLkhBCRwwG06buiCc34Xyshtc8eRMaLZarHeQpEkPk43f7Xo7UhOekqQ1+/JlZO
rCKRUb8VPdLv/gA9lxzDAJDuSTN8RY0BBJlwNjrP3nrDLIfxAe5OZXxgdwvSi5Rx
nghWaiM7qtrcaAKcnZnoNrHXvouw9CbLEJa92RJjKIUE94GbFozDSM62CokXrKC9
RgcwZfLQijzlgKM90pjLjAlw1Iz/IN3g5k+TqrbHX7zo8I85MIn/1yRyUIGMT3BU
MiPKRkCqVZ1NGPLLsuz4vCe/wA9dmhZxrEAECLEFp6/9PoT9abcIxIYJpV1PhxeG
1wIDAQAB
-----END PUBLIC KEY-----`;

let encryptor:any;
export function encryptData(data)
{
  if(!encryptor)
    encryptor = new JsEncryptModule.JSEncrypt();

  encryptor.setPublicKey(publicKey);
  const encrypted = encryptor.encrypt(JSON.stringify(data));
  return encrypted;
}
export function encryptSelfExclusionData(data) {
  if (!encryptor)
    encryptor = new JsEncryptModule.JSEncrypt();

  encryptor.setPublicKey(publicKey);
  const encrypted = encryptor.encrypt(data);
  return encrypted;
}

export function getBasePathByEnvironment():string
{
  const arr = window.location.href.split('/');
  return arr[0] + '//' + arr[2] + '/app/projects/' + environment.projectPath
}

export function getParsedUrl(location: string): any {
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

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getAmountNominalsByCurrency(currencyId:string):Array<any>
{
  let nominals:Array<any>;
  switch (currencyId)
  {
    case "RUB":
      nominals = [
        {
          "id": 1,
          "value": 500.00,
          "className": 'uk-width-1-3'
        },
        {
          "id": 2,
          "value": 1000.00,
          "className": "uk-width-1-3"
        },
        {
          "id": 3,
          "value": 5000.00,
          "className": "uk-width-1-3"
        },
        {
          "id": 4,
          "value": 10000.00,
          "className": "uk-width-1-2"
        },
        {
          "id": 5,
          "value": 15000.00,
          "className": "uk-width-1-2"
        },
        {
          "id": 6,
          "value": 20000.00,
          "className": "uk-width-1-1"
        }
      ];
      break;
    case "EUR":
      nominals = [
        {
          "id": 1,
          "value": 10.00,
          "className": 'uk-width-1-3'
        },
        {
          "id": 2,
          "value": 20.00,
          "className": "uk-width-1-3"
        },
        {
          "id": 3,
          "value": 50.00,
          "className": "uk-width-1-3"
        },
        {
          "id": 4,
          "value": 100.00,
          "className": "uk-width-1-2"
        },
        {
          "id": 5,
          "value": 200.00,
          "className": "uk-width-1-2"
        },
        {
          "id": 6,
          "value": 300.00,
          "className": "uk-width-1-1"
        }
      ];
      break;
    case "USD":
      nominals = [
        {
          "id": 1,
          "value": 10.00,
          "className": 'uk-width-1-3'
        },
        {
          "id": 2,
          "value": 20.00,
          "className": "uk-width-1-3"
        },
        {
          "id": 3,
          "value": 50.00,
          "className": "uk-width-1-3"
        },
        {
          "id": 4,
          "value": 100.00,
          "className": "uk-width-1-2"
        },
        {
          "id": 5,
          "value": 200.00,
          "className": "uk-width-1-2"
        },
        {
          "id": 6,
          "value": 300.00,
          "className": "uk-width-1-1"
        }
      ];
      break;
    default:
      nominals = [
        {
          "id": 1,
          "value": 10.00,
          "className": 'uk-width-1-3'
        },
        {
          "id": 2,
          "value": 20.00,
          "className": "uk-width-1-3"
        },
        {
          "id": 3,
          "value": 50.00,
          "className": "uk-width-1-3"
        },
        {
          "id": 4,
          "value": 100.00,
          "className": "uk-width-1-2"
        },
        {
          "id": 5,
          "value": 200.00,
          "className": "uk-width-1-2"
        },
        {
          "id": 6,
          "value": 300.00,
          "className": "uk-width-1-1"
        }
      ];
  }
  return nominals;
}

export function getFakeAmountRangeByCurrency(currencyId:string):number
{
  let range:number;
  switch (currencyId)
  {
    case "RUB":
      range = 100;
      break;
    case "EUR":
      range =  10;
      break;
    case "USD":
      range =  10;
      break;
    default:
      range =  10;
  }
  return range;
}
/* View in fullscreen */
export function openFullscreen(elem)
{
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
export function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document['mozCancelFullScreen']) { /* Firefox */
    document['mozCancelFullScreen']();
  } else if (document['webkitExitFullscreen']) { /* Chrome, Safari and Opera */
    document['webkitExitFullscreen']();
  } else if (document['msExitFullscreen']) { /* IE/Edge */
    document['msExitFullscreen']();
  }
}

export function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject  = {};

  for(var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for(i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

export function isEmptyObject(obj):boolean
{
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function isNotNullOrUndefined(value):boolean
{
  return !!value || value === 0;
}

export function loadExternalStyles(styleUrl: string) {
  return new Promise((resolve, reject) =>
  {
    const styleElement = document.createElement('link');
    styleElement.href = styleUrl;
    styleElement.rel = 'stylesheet';
    styleElement.onload = resolve;
    document.head.appendChild(styleElement);
  });
}

export function loadExternalScript(scriptUrl:string) {
  return new Promise(resolve => {
    const scriptElement = document.createElement('script');
    scriptElement.src = scriptUrl;
    scriptElement.onload = resolve;
    document.body.appendChild(scriptElement);
  });
}

export function generateRundomString(length:number)
{
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getMappedGame(game:any):any
{
  game.gameImage = (game["i"] && game["i"].startsWith('http')) ? game["i"] : 'https://resources.' + environment.hostName + '/products/' + game["i"];
  game.name = game["n"];
  game.hasDemo = game["hd"];
  game.nickName = game["nn"];
  game.openMode = game["o"];
  game.productId = game["p"];
  game.providerId = game["s"];
  game.providerName = game["sp"];
  game.rating = game["r"];
  game.jackpotValue = game["jp"] ? Math.max(...JSON.parse(game["jp"])) : null;
  game.subproviderId = game["ss"];
  game.subproviderName = game["sn"];
  game.isFavorite = game["f"];
  game.categoryId = game["c"] && game["c"].length ? game["c"][0] : 0;
  return game;
}

export function getFragmentsByType(block, position:string, location:string = null):any
{
  const fragments = Object.entries(block).reduce((obj, [key, val]) => {
    const fragment = block[key].find(item => item.Position === position);
    if (fragment)
    {
      obj[key] = {
        Order: fragment.Items[0].Order,
        Position: fragment.Position,
        Title: fragment.Items[0].Title
      };
      const filteredByLocation = [];
      for (let i = 0; i < fragment.Items.length; i++)
      {
        const item =  fragment.Items[i];
        item.Config =  item.Href && JSON.parse(item.Href);
        item.Config.style = item.Config.style ?  {...item.Config.style,...{order:item.Order}} : {order:item.Order};
        if(item.Config.location == location)
        {
          item.Config.name = fragment.Items[0].Title;
          filteredByLocation.push(item);
        }
      }
      obj[key].Items = filteredByLocation;
    }
    return obj;
  }, {});
  return fragments;
}

export function passwordConfigs(config: ConfigService): {val: boolean; name: string; condition: Function; valid: boolean | undefined }[] {
  const regExProperty = config.defaultOptions?.['RegExProperty'];
  return [
    {
      val: regExProperty['IsLowercaseRequired'],
      name: 'LowerCaseRequired',
      condition: (x) => /[a-z]+/.test(x),
      valid: undefined
    },
    {
      val: regExProperty['IsUppercaseRequired'],
      name: 'UpperCaseRequired',
      condition: (x) => /[A-Z]+/.test(x),
      valid: undefined
    },
    {
      val:!regExProperty['IsUppercaseRequired'] && !regExProperty['Uppercase'],
      name: 'UppercaseNotAllowed',
      condition: (x) => !/[A-Z]+/.test(x),
      valid: undefined
    },
    {
      val: !regExProperty['IsLowercaseRequired'] && !regExProperty['Lowercase'],
      name: 'LowercaseNotAllowed',
      condition: (x) => !/[a-z]+/.test(x),
      valid: undefined
    },

    {
      val: !regExProperty['IsLowercaseRequired'] && !regExProperty['IsUppercaseRequired'] && !regExProperty['Uppercase'] && !regExProperty['Lowercase'],
      name: 'LettersNotAllowed',
      condition: (x) => !/[A-Za-z]+/.test(x),
      valid: undefined
    },
    {
      val: !regExProperty['IsDigitRequired'] && !regExProperty['Numeric'],
      name: 'DigitNotAllowed',
      condition: (x) => !/[0-9]+/.test(x),
      valid: undefined
    },
    {
      val: regExProperty['IsDigitRequired'],
      name: 'DigitRequired',
      condition: (x) => /[0-9]+/.test(x),
      valid: undefined
    },
    {
      val: !regExProperty['IsSymbolRequired'] && !regExProperty['Symbol'],
      name: 'SymbolNotAllowed',
      condition: (x) => !/[!@#~$%^&*\\()_+=\[{\]};:<>|./?,-]/.test(x),
      valid: undefined
    },
    {
      val: regExProperty['IsSymbolRequired'],
      name: 'SymbolRequired',
      condition: (x) => /[!@#$%^&*()_+=\[{\]};:<>|./?,-]/.test(x),
      valid: undefined
    },
    {
      val: regExProperty['MaxLength'],
      name: 'PasswordMaxLength',
      condition: (x) => x.length <= regExProperty['MaxLength'],
      valid: undefined
    },
    {
      val: regExProperty['MinLength'],
      name: 'PasswordMinLength',
      condition: (x) => x.length >= regExProperty['MinLength'],
      valid: undefined
    }
  ].filter(item => item.val);
}

export function compressImage(imgToCompress, resizingFactor):any
{
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const originalWidth = imgToCompress.width;
  const originalHeight = imgToCompress.height;

  const canvasWidth = originalWidth * resizingFactor;
  const canvasHeight = originalHeight * resizingFactor;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(
      imgToCompress,
      0,
      0,
      originalWidth * resizingFactor,
      originalHeight * resizingFactor
  );
  return canvas;
}
export function getRecaptchaKey(config: ConfigService):string
{
  return config.defaultOptions["ReCaptchaKey"];
}

export function getDomain():string
{
  let hostname = window.location.hostname;
  if(hostname === "localhost")
    return "";
  let re=/[-\w]+\.(?:[-\w]+\.xn--[-\w]+|[-\w]{2,}|[-\w]+\.[-\w]{2})$/i;
  let tld = re.exec(hostname);
  return tld[0];
}

export function isMobileUrl():boolean
{
  return location.hostname.startsWith("m.");
}