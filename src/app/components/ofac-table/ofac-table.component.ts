import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OfacElement } from '../../interfaces/ofac-element';
import { ScreeningService } from '../../services/screening.service';

@Component({
  selector: 'app-ofac-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './ofac-table.component.html',
  styleUrl: './ofac-table.component.css'
})
export class OfacTableComponent implements OnChanges{
  results!: OfacElement[];
  @Input() name!: string;

  constructor(private screeningService:ScreeningService){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] && this.name) {
      this.getOfacResults();
    }
  }

  getOfacResults(){
    this.screeningService.getOfacResults(this.name).subscribe((resp)=>{
      this.results = resp.data;
    })
  }
}
