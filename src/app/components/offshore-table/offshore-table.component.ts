import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OffshoreElement } from '../../interfaces/offshore-element';
import { ScreeningService } from '../../services/screening.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-offshore-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './offshore-table.component.html',
  styleUrl: './offshore-table.component.css'
})
export class OffshoreTableComponent implements OnChanges{
  results!: OffshoreElement[];
  @Input() name!: string;

  constructor(private screeningService:ScreeningService){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] && this.name) {
      this.getOffShoreResults();
    }
  }

  getOffShoreResults(){
    this.screeningService.getOffShoreResults(this.name).subscribe((resp)=>{
      this.results = resp.data;
    })
  }
}
