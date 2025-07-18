import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../../shared/shared-primeng';
import { Customer } from '../../../models/customer.model';
import { Bank } from '../../../../banks/models/bank.model';
import { AppService } from '../../../../../services/app.service';

@Component({
    selector: 'app-edit-customer-dialog',
    imports: [FormsModule, SHARED_PRIMENG_MODULES],
    templateUrl: './edit-customer-dialog.component.html',
    styleUrl: './edit-customer-dialog.component.css'
})
export class EditCustomerDialogComponent implements OnInit{

    customerToUpdate: any;
    banks: Bank[] = [];

    model: Customer = {
        name: "",
        lastname: "",
        documentNumber: "",
        address: "",
        mail: "",
        phone: "",
        customerStatus: 0,
        birth: "",
        bankId: 0
    }


    constructor(private dialogConfig: DynamicDialogConfig, 
        private ref: DynamicDialogRef<EditCustomerDialogComponent>,
        private appService: AppService) {
    }

    
    ngOnInit() {
        this.customerToUpdate = this.dialogConfig.data.value;
        if (this.customerToUpdate) {
            this.model = { ...this.customerToUpdate, bankId: this.customerToUpdate.bank.id }; // Hacemos una copia para no modificar directo el objeto original
        }
        
        this.loadBanks();
    } 

    edit(){
        this.appService.customerApiService.updateCustomer(this.model).subscribe({
            next: (response) => this.ref.close(response), 
            error: (err) => console.error('Error:', err)
        })
    }
    
    loadBanks(){
        this.appService.bankApiService.getBanks().subscribe({ 
        next: data => { this.banks = <Bank[]>data} 
        }
    )
    }



}
