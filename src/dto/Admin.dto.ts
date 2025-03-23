export interface CreateAdmin{ 
    Email:string, 
    Role:string, 
    Product:boolean,
    Password:string, 
    Agent_account:boolean, 
    Agent_operation:boolean, 
    Supplier_account:boolean, 
    Supplier_operation:boolean, 
    Company_name:string,
     IsApproved:number,
     Token:string,
     resetTokenExpiry:string
} 
 