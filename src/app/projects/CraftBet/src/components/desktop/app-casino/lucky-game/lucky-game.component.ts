import {AfterViewInit, Component, Injector, OnInit} from '@angular/core';
import {SimpleModalComponent, SimpleModalService} from "ngx-simple-modal";
import {ConfirmModel} from "../../../../../../../@core/interfaces";
import {Methods} from "../../../../../../../@core/enums";
import {filter, take} from "rxjs/operators";
import {getMappedGame, getParsedUrl} from "../../../../../../../@core/utils";
import {BaseApiService} from "../../../../../../../@core/services/api/base-api.service";
import {Router} from "@angular/router";
import {AppConfirmComponent} from "../../app-confirm/app-confirm.component";
import {UserLogined} from "../../../../../../../@core/services/app/userLogined.service";

@Component({
    selector: 'lucky-game',
    templateUrl: './lucky-game.component.html',
    styleUrls: ['./lucky-game.component.scss']
})
export class LuckyGameComponent extends SimpleModalComponent<ConfirmModel, boolean> implements AfterViewInit{
    games: any[] = [];
    public totalFrames = 14;
    public animationDuration = 3500;
    public timePerFrame = this.animationDuration / this.totalFrames;
    public timeWhenLastUpdate;
    public timeFromLastUpdate;
    public frameNumber = 1;
    public done = false;
    src: string = "../assets/images/slots/slot1.png";

    public startWidth = 15;
    public endWidth = 174;
    public startTime;
    public progressTrackWidth = 0;

    animatedBlock:any;
    public winnerGame:string;
    public selectedGame:any;
    public gameName:string;
    public winnerGameId:number;
    public openMode:number;
    public clientWidth:number = 54;
    public clientHeight:number = 54;


    constructor(protected injector: Injector,
                private apiService: BaseApiService,
                protected router:Router,
                protected userLogged:UserLogined
    ) {
        super();
    }

    ngOnInit() {
       this.getGames({PageSize:50});
    }

    getGames(filter, concatData = false): void
    {
        this.apiService.apiRequest(filter,undefined, Methods.GET_GAMES, false).pipe(take(1))
            .subscribe(data => {
                if (data.ResponseCode === 0)
                {
                    const games = data.ResponseObject.Games.map(game => {
                        game = getMappedGame(game);
                        return game;
                    });
                    this.games = concatData ? [...this.games, ...games] : games;
                }
            });
    }
    animateFrame = (startTime) => {
        if (!this.timeWhenLastUpdate) this.timeWhenLastUpdate = startTime;

        this.timeFromLastUpdate = startTime - this.timeWhenLastUpdate;

        if (this.timeFromLastUpdate > this.timePerFrame || this.timeFromLastUpdate === 0) {
            this.src = `../assets/images/slots/slot${this.frameNumber}.png`;
            // reset the last update time
            this.timeWhenLastUpdate = startTime;

            // then increase the frame number or reset it if it is the last frame
            if (this.frameNumber >= this.totalFrames) {
                this.done = true;
            } else {
                this.frameNumber = this.frameNumber + 1;
            }
        }
        if (!this.done)
            requestAnimationFrame(this.animateFrame);
    }

    resetAnimation() {
        this.frameNumber = 1;
        this.done = false;
        this.timeFromLastUpdate = undefined;
        this.timeWhenLastUpdate = undefined;
        this.selectedGame = null;
        document.querySelector('#spinner').classList.add('disabled');
        requestAnimationFrame(this.animateFrame);
        this.startAnimation();
        this.openSelectedGame();
        this.spin();
    }

    animateWidth = (timestamp) => {
        if (!this.startTime) this.startTime = timestamp;
        let progress = timestamp - this.startTime;
        this.progressTrackWidth = this.easeInOutQuart(progress, this.startWidth, this.endWidth - this.startWidth, this.animationDuration);
        if (progress < this.animationDuration) {
            requestAnimationFrame(this.animateWidth);
        }
    }

    startAnimation() {
        this.startTime = null;
        requestAnimationFrame(this.animateWidth);
    }

    openSelectedGame()
    {
        const index = Math.floor(Math.random() * this.games.length - 1);
        this.winnerGame = this.games[index].gameImage;
        this.winnerGameId = this.games[index].productId;
        this.openMode = this.games[index].openMode;
        setTimeout(() => {
            this.selectedGame = this.winnerGame;
            this.gameName = this.games[index].name;
            document.querySelector('#spinner').classList.remove('disabled');
        }, 3000);
    }
// Easing function for smooth animation
    easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }


    init(duration = 1)
    {
        this.animatedBlock.forEach(item =>
        {
            const animatedGames = item.querySelector('.animated-games');
            const animatedGamesClone = animatedGames.cloneNode(false);
            const pool = [];

            const arr = [];

            this.games.forEach(item => {
                {
                    arr.push(item.gameImage);
                }
            });

            pool.push(...this.shuffle(arr));

            for (let i = pool.length - 1; i >= 0; i--) {
                const imageSrc = pool[i];
                const gameImage = document.createElement('img');

                gameImage.classList.add('game-image');
                gameImage.style.width = this.clientWidth + 'px';
                gameImage.style.height = this.clientHeight + 'px';
                gameImage.style.marginTop = '16px';
                gameImage.style.marginBottom = '16px';
                gameImage.src = imageSrc;
                if(i === pool.length - 1)
                    gameImage.src = this.winnerGame;
                animatedGamesClone.appendChild(gameImage);
            }
            animatedGamesClone['style'].transitionDuration = `${duration > 0 ? duration : 1}s`;
            animatedGamesClone['style'].transform = `translateY(-${item.clientHeight * (pool.length - 1)}px)`;
            item.replaceChild(animatedGamesClone, animatedGames);
        });

    }


    async spin()
    {
        this.init(2);

        let animated = [];
         this.animatedBlock.forEach(item => {
             {
                 animated.push(item);
             }
         });

        for(const item of animated)
        {
            const animatedGames = item.querySelector('.animated-games');
            const duration = parseInt(animatedGames['style'].transitionDuration);
            animatedGames['style'].transform = 'translateY(0)';
            await new Promise((resolve) => setTimeout(resolve, duration * 100));
        }
    }


    shuffle([...arr])
    {
        let m = arr.length;
        while (m) {
            const i = Math.floor(Math.random() * m--);
            [arr[m], arr[i]] = [arr[i], arr[m]];
        }
        return arr;
    }

    ngAfterViewInit()
    {
        this.animatedBlock = document.querySelectorAll('.animated-block');
    }

}
