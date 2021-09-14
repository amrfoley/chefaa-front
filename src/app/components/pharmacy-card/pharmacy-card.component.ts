import { Component, Input, OnInit } from '@angular/core';
import { Pharmacy } from 'src/app/Models/Pharmacy';

@Component({
  selector: 'pharmacy-card',
  templateUrl: './pharmacy-card.component.html',
  styleUrls: ['./pharmacy-card.component.scss']
})
export class PharmacyCardComponent implements OnInit {

  @Input() pharmacy: Pharmacy;

  constructor() { }

  ngOnInit(): void {
  }

}
