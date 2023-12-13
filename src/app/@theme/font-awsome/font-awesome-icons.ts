import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faCheckCircle, faUser as fasUser} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt as fasTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {faTimes as fasTimes} from "@fortawesome/free-solid-svg-icons";
import {faInfoCircle as fasInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {faCheck as fasCheck} from "@fortawesome/free-solid-svg-icons";
import {faArrowAltCircleUp as fasArrowAltCircleUp} from "@fortawesome/free-solid-svg-icons";
import {faAngleRight as fasAngleRight} from "@fortawesome/free-solid-svg-icons";
import {faMinus as fasMinus} from "@fortawesome/free-solid-svg-icons";
import {faPlus as fasPlus} from "@fortawesome/free-solid-svg-icons";
import {faBan as fasBan} from "@fortawesome/free-solid-svg-icons";
import {faHeart as fasHeart} from "@fortawesome/free-solid-svg-icons";
import {faThumbsUp as fasThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faBars as fasBars} from "@fortawesome/free-solid-svg-icons";
import {faTh as fasTh} from "@fortawesome/free-solid-svg-icons";
import {faList as fasList} from "@fortawesome/free-solid-svg-icons";
import {faSearch as fasSearch} from "@fortawesome/free-solid-svg-icons";
import {faSortDown as fasSortDown} from "@fortawesome/free-solid-svg-icons";
import {faUnlockAlt as fasUnlockAlt} from "@fortawesome/free-solid-svg-icons";
import {faHeadphones as fasHeadphones} from "@fortawesome/free-solid-svg-icons";
import {faSignOutAlt as fasSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {faAngleDown as fasAngleDown} from "@fortawesome/free-solid-svg-icons";
import {faAngleUp as fasAngleUp} from "@fortawesome/free-solid-svg-icons";
import {faStar as fasStar} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope as fasEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faCheckCircle as fasCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {faSave as fasSave} from "@fortawesome/free-solid-svg-icons";

import {faHeart as farHeart} from "@fortawesome/free-regular-svg-icons";
import {faThumbsUp as farThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {faStar as farStar} from "@fortawesome/free-regular-svg-icons";
import {faTimesCircle as farTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {faEnvelope as farEnvelope} from "@fortawesome/free-regular-svg-icons";

import {faWhatsapp} from "@fortawesome/free-brands-svg-icons";

const fas = [fasUser, fasTrashAlt, fasTimes, fasInfoCircle, fasCheck, fasArrowAltCircleUp, fasUnlockAlt, fasHeadphones, fasAngleUp, fasAngleDown,fasSave,
    fasAngleRight, fasBan, fasMinus, fasPlus, fasHeart, fasSearch, fasBars, fasTh, fasList, fasSortDown, fasSignOutAlt, fasStar, fasEnvelope, fasCheckCircle, fasThumbsUp];
const fab = [faWhatsapp];
const far = [farHeart, farTimesCircle, farEnvelope, farThumbsUp, farStar];

@NgModule({
    imports:[
        CommonModule,
        FontAwesomeModule
    ],
    exports:[FontAwesomeModule]
})
export class FontAwesomeIcons
{

    constructor(library: FaIconLibrary)
    {

        library.addIcons(...fas, ...far, ...fab);
    }
}
