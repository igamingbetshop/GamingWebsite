import {ChangeDetectionStrategy, Component, computed, inject, input, output, signal} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";
import {BonusesService} from "@core/services/api/bonuses.service";
import {take} from "rxjs";
import {Slice} from "../slot-wheel/slot-wheel.component";
import {ConfigService} from "@core/services";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'fortuna-fragment',
  templateUrl: './fortuna-fragment.component.html',
  styleUrls:["./fortuna-fragment.component.scss"],
  imports: [CommonModule, TranslateModule, RouterModule, NgOptimizedImage],
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FortunaFragmentComponent {

  config = inject(ConfigService);
  onWinnersInfo = output<boolean>();
  slices = input<Slice[]>([]);
  bonus = input.required<any>();
  logo = signal<string>(`${window.location.protocol}//${this.config.defaultOptions.Domain}/assets/images/bonuses/wheel-logo.png`);
  result = signal<string>(`${window.location.protocol}//${this.config.defaultOptions.Domain}/assets/images/bonuses/results.svg`);
  wheelDiameter = input<number, number>(500, {transform:(data:number) => {
    return data;
  }});
  isSpinning = signal<boolean>(false);
  spinAgain = signal<boolean>(false);
  showResult = signal<boolean>(false);
  resultBonusName = signal<string>("");
  sliceCount = computed(() => this.slices().length);
  sliceRotateAngle = computed(() => 360 / this.sliceCount());
  wheelRadius = computed(() => this.wheelDiameter() / 2);
  sliceWidth = computed(() => 2 * this.wheelRadius() * Math.tan(Math.PI * this.sliceRotateAngle() / 360));
  labelSize = computed(() => this.wheelRadius() / 10);
  style = computed(() => ({width:`${this.sliceWidth()}px`,
    height:`${this.wheelRadius()}px`,
    "clip-path":"polygon(0% 0%, 100% 0%, 50% 100%)"}));

  #dialogRef = inject(MatDialogRef<FortunaFragmentComponent>);

  constructor(private bonusService:BonusesService)
  {

  }

  getWinnerIndex(id:number)
  {
    this.bonusService.spinWheel(id).pipe(take(1)).subscribe(data => {
        if(data['ResponseCode'] === 0)
        {
          const index = data['ResponseObject'];
          this.rotateWheelByIndex(index);
          this.isSpinning.update(value => !value);
          const p = setTimeout(() => {
            this.onWinnersInfo.emit(true);
            this.checkSpinAgain(index);
          }, 10000);
        }
    });
  }

  spin()
  {
    this.getWinnerIndex(+this.bonus()['Id']);
  }

  rotateWheelByIndex(winnerIndex:number)
  {
    const spinCount = 8;
    const offset = this.sliceRotateAngle() * winnerIndex;
    const spinValue = 360 * spinCount - offset;

    const stylesheet = document.styleSheets[0];
    const newRule = `
    @keyframes fortuna-spinning {
      from { transform: rotate(0); }
      to {  transform: rotate(${spinValue}deg); }
    }
  `;
    const rules = Array.from(stylesheet.cssRules);
    const ruleExists = rules.some(rule => rule.cssText.includes(newRule));
    if (!ruleExists) {
      stylesheet.insertRule(newRule, stylesheet.cssRules.length);
    }
  }

  checkSpinAgain(index:number)
  {
    const winBonus = this.slices()[index];
    this.spinAgain.set(winBonus.id == this.bonus()['BonusId']);
    if(this.spinAgain())
      this.isSpinning.set(false);
    this.showResult.set(!this.spinAgain());
    if(this.showResult())
      this.resultBonusName.set(this.slices()[index].label)

  }
  close()
  {
    this.#dialogRef.close();
  }
}
