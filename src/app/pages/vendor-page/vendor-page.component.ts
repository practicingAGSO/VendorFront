import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Vendor } from '../../interfaces/vendor';
import { VendorService } from '../../services/vendor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vendor-page',
  standalone: true,
  imports: [CommonModule, ToastModule, ToolbarModule, TableModule, ButtonModule,
     DialogModule, DropdownModule, InputTextModule, InputNumberModule,
     ConfirmDialogModule, FormsModule],
  templateUrl: './vendor-page.component.html',
  styleUrl: './vendor-page.component.css',
  providers: [MessageService, ConfirmationService]

})
export class VendorPageComponent {
  @ViewChild('dt') dt: Table | undefined;

  vendorDialog: boolean = false;

  vendors!: Vendor[];

  vendor!: Vendor;

  submitted: boolean = false;

  create: boolean = false;

  constructor(private vendorService: VendorService, private messageService: MessageService,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.getVendors();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }


  openNew() {
    this.vendor = {
      id: 0,                       
      companyName: "",              
      tradeName: "",              
      taxId: "",                    
      number: "",                   
      email: "",                     
      physicalAddress: "",           
      country: ""                   
    };
    this.submitted = false;
    this.vendorDialog = true;
    this.create = true;
}

editVendor(vendor: Vendor) {
    this.create = false;
    this.vendor = { ...vendor };
    this.vendorDialog = true;
}


findIndexById(id: number): number {
  let index = -1;
  for (let i = 0; i < this.vendors.length; i++) {
      if (this.vendors[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
}

hideDialog() {
  this.vendorDialog = false;
  this.submitted = false;
}


getVendors(){
      this.vendorService.getVendors().subscribe({
          next: (res)=> {this.vendors = res},
          error: (err) => {console.log(err)}
        })
    }

saveVendor() {
      this.submitted = true;

      if(this.vendor.id){
        let vendorUpdate: Vendor = {
          id: this.vendor.id,
          companyName: this.vendor.companyName,              
          tradeName: this.vendor.tradeName,              
          taxId: this.vendor.taxId,                    
          number: this.vendor.number,                   
          email: this.vendor.email,                     
          physicalAddress: this.vendor.physicalAddress,           
          country: this.vendor.country,
          websiteUrl: this.vendor.websiteUrl,
          annualTurnover: this.vendor.annualTurnover        
        }

        this.vendors[this.findIndexById(this.vendor.id)] = this.vendor

        this.vendorService.updateVendor(this.vendor.id, vendorUpdate).subscribe({
          next: () => { 
              this.getVendors()
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Proveedor Actualizado', life: 3000 });}
             
        })

      }
      else{
        let vendor: Vendor = {
          id: 0,
          companyName: this.vendor.companyName,              
          tradeName: this.vendor.tradeName,              
          taxId: this.vendor.taxId,                    
          number: this.vendor.number,                   
          email: this.vendor.email,                     
          physicalAddress: this.vendor.physicalAddress,           
          country: this.vendor.country,
          websiteUrl: this.vendor.websiteUrl,
          annualTurnover: this.vendor.annualTurnover        
        }

        this.vendorService.addVendor(vendor).subscribe({
          next: () => { 
              this.getVendors()
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Proveedor Registrado', life: 3000 });}
             
        })
      }


      this.vendors = [...this.vendors];
      this.vendorDialog = false;
      this.vendor = {
        id: 0,                       
        companyName: "",              
        tradeName: "",              
        taxId: "",                    
        number: "",                   
        email: "",                     
        physicalAddress: "",           
        country: ""                   
      };
  }

  deleteVendor(vendor: Vendor) {
    this.confirmationService.confirm({
        message: 'Seguro que quieres eliminar ' + vendor.companyName + '?',
        header: 'Confirmar',
        acceptLabel: 'Sí',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.vendorService.deleteVendor(vendor.id).subscribe({
              next: ()=> {
                  this.getVendors()
                  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Proveedor Eliminado', life: 3000 });}
            })
        }
    });
}

}
