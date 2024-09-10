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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { OfacTableComponent } from '../../components/ofac-table/ofac-table.component';
import { OffshoreTableComponent } from '../../components/offshore-table/offshore-table.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vendor-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule, ToastModule, ToolbarModule, TableModule, ButtonModule,
     DialogModule, DropdownModule, InputTextModule, InputNumberModule,
     ConfirmDialogModule, InputMaskModule, DropdownModule,OfacTableComponent, OffshoreTableComponent],
  templateUrl: './vendor-page.component.html',
  styleUrl: './vendor-page.component.css',
  providers: [MessageService, ConfirmationService]

})
export class VendorPageComponent {
  @ViewChild('dt') dt: Table | undefined;

  vendorDialog: boolean = false;
  screeningDialog:boolean = false;
  ofacDialog: boolean = false;
  icijDialog: boolean = false;
  name!: string;

  vendors!: Vendor[];

  vendor!: Vendor;

  submitted: boolean = false;

  create: boolean = false;

  vendorForm!: FormGroup;

  countries: any[] | undefined;



  constructor(private vendorService: VendorService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.getVendors();
    this.vendorForm = this.fb.group({
      id: [''],
      companyName: ['', Validators.required],
      tradeName: ['', Validators.required],
      taxId: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      websiteUrl: ['', [Validators.required]],
      physicalAddress: ['', Validators.required],
      country: ['', Validators.required],
      annualTurnover: ['', Validators.required]
    });

    this.countries = [
      'Australia', 'Brasil', 'China', 'Egipto', 'Francia', 'Alemania',
      'India', 'Japón', 'España', 'Perú', 'Estados Unidos', 'Argentina',
      'Canadá', 'Chile', 'Colombia', 'México', 'Noruega', 'Países Bajos',
      'Portugal', 'Rusia', 'Suecia', 'Suiza', 'Turquía', 'Italia', 'Polonia',
      'Sudáfrica', 'Nueva Zelanda'
    ]
    
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }


  openNew() {
    this.vendorForm.patchValue({
      id: 0,
      companyName: "",
      tradeName: "",
      taxId: "",
      number: "",
      websiteUrl: "",
      email: "",
      physicalAddress: "",
      country: "",
      annualTurnover: 0
  });
    this.submitted = false;
    this.vendorDialog = true;
    this.create = true;
}

editVendor(vendor: Vendor) {
    this.create = false;
    this.vendorForm.patchValue({
      id:vendor.id,
      companyName: vendor.companyName,
      tradeName: vendor.tradeName,
      taxId: vendor.taxId,
      number: vendor.number,
      websiteUrl: vendor.websiteUrl,
      email: vendor.email,
      physicalAddress: vendor.physicalAddress,
      country: vendor.country,
      annualTurnover: vendor.annualTurnover
  });
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

openScreening(name: string){
  this.name = name;
  this.screeningDialog = true;
}

openIcijDialog(){
  this.screeningDialog = false;
  this.icijDialog = true;
}

openOfacDialog(){
  this.screeningDialog = false;
  this.ofacDialog = true;
}


getVendors(){
      this.vendorService.getVendors().subscribe({
          next: (res)=> {this.vendors = res},
          error: (err) => {console.log(err)}
        })
    }

saveVendor() {
      this.submitted = true;
      const idValue = this.vendorForm.get('id')?.value;


      if(idValue){

        this.vendors[this.findIndexById(idValue)] = this.vendorForm.value
        this.vendorForm.patchValue({
          id: idValue,
        });        
        this.vendorService.updateVendor(idValue, this.vendorForm.value).subscribe({
          next: () => { 
              this.getVendors()
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Proveedor Actualizado', life: 3000 });}
             
        })
      }
      else{
        this.vendorService.addVendor(this.vendorForm.value).subscribe({
          next: () => { 
              this.getVendors()
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Proveedor Registrado', life: 3000 });}
             
        })
      }


      this.vendors = [...this.vendors];
      this.vendorDialog = false;
      this.vendorForm.patchValue({
        id: 0,
        companyName: "",
        tradeName: "",
        taxId: "",
        number: "",
        websiteUrl: "",
        email: "",
        physicalAddress: "",
        country: "",
        annualTurnover: 0
    });
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

logout(){
  localStorage.clear();
  this.router.navigate(['']);
}

}
