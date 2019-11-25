//Declaración de variables
var nombreUsuario = "Bruce Wayne";
var saldoCuenta = 23830;
var limiteExtraccion = 5000;
var saldoAnterior;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
    iniciarSesion();
}

//Funciones para modificar el saldo de la cuenta.
function sumarSaldoCuenta(cantidadDinero){
    saldoCuenta += cantidadDinero;
}

function restarSaldoCuenta(cantidadDinero)
{
    saldoCuenta -= cantidadDinero;
}

function cambiarLimiteDeExtraccion() {
    var nuevoLimiteExtraccion = prompt("Ingrese nuevo limite de extraccion:");
    if(validarDatoIngresado(nuevoLimiteExtraccion)){
        if(validacionIsNan(nuevoLimiteExtraccion)){
            alert("Debe ingresar un nuevo limite de extaccion válido");
        }
        else if(validacionSaldosNegativos(nuevoLimiteExtraccion)){
            alert("Es imposible operar con saldos negativos");
        }    
        else{
            limiteExtraccion = nuevoLimiteExtraccion;
            actualizarLimiteEnPantalla();
            alert("Tu nuevo limite de extraccion ahora es de: $" + limiteExtraccion);
        }   
    }
    else{
        alert("Usted no ha ingresado un nuevo limite de extraccion");
    }   
}

function extraerDinero() {
    var dineroAExtraer = prompt("Ingrese la cantidad de dinero que desea extraer");
    var validarBillete = dineroAExtraer % 100;
    if(validarDatoIngresado(dineroAExtraer)){
        if(validacionIsNan(dineroAExtraer)){
            alert("Debe ingresar un monto de dinero válido");
        }
        else if(validacionSaldosNegativos(dineroAExtraer)){
            alert("Es imposible operar con saldos negativos");
        }
        else if(!haySaldoDisponible(dineroAExtraer)){
            alert("No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero.")
        }
        else if(dineroAExtraer > limiteExtraccion){
            alert("La cantidad de dinero que desea extraer es mayor a tu limite de extracción");
        }
        else if(validarBillete == 0){
            saldoAnterior = saldoCuenta;
            restarSaldoCuenta(dineroAExtraer);
            actualizarSaldoEnPantalla();
            alert("Has retirado: $" + dineroAExtraer + "\nSaldo anterior: $" + saldoAnterior +
                  "\nSaldo actual: $" + saldoCuenta);
        }
        else{
            alert("Solo puede extraer billetes de 100");
        }
    }
    else{
        alert("Usted no ha ingresado el monto a extraer");
    }
}

function depositarDinero() {
    var dineroADepositar = prompt("Ingrese la cantidad de dinero que desea depositar");
    saldoAnterior = saldoCuenta;
    if(validarDatoIngresado(dineroADepositar)){
        if(validacionIsNan(dineroADepositar)){
            alert("Debe ingresar un monto de dinero válido");
        }
        else if(validacionSaldosNegativos(dineroADepositar)){
            alert("Es imposible operar con saldos negativos");
        }
        else{
            dineroADepositar = parseInt(dineroADepositar);
            sumarSaldoCuenta(dineroADepositar);
            actualizarSaldoEnPantalla();
            alert("Has depositado: $" + dineroADepositar + "\nSaldo anterior: $" + saldoAnterior + 
                  "\nSaldo actual: $" + saldoCuenta);
        }  
    }
    else{
        alert("Usted no ha ingresado la cantidad de dinero que desea depositar");
    }
}

function pagarServicio(){
    var precioAgua = 350;
    var precioTelefono = 425;
    var precioLuz = 210;
    var precioInternet = 570;
    var servicioAPagar = prompt("Ingrese el numero que corresponda con el servicio que desea pagar:" + "\n1- Agua \n2- Telefono \n3- Luz \n4- Internet");    
    if(validarDatoIngresado(servicioAPagar)){        
        servicioAPagar = parseInt(servicioAPagar);
        switch(servicioAPagar)
        {   case 1: 
                operacionPagarServicios(precioAgua, "Agua");
                break;
            case 2:
                operacionPagarServicios(precioTelefono, "Telefono");
                break;
            case 3:
                operacionPagarServicios(precioLuz, "Luz");
                break;
            case 4:
                operacionPagarServicios(precioInternet, "Internet");
                break;            
            default:
                alert("No existe el servicio que intenta pagar.");
        }
    }
    else{
        alert("No ha ingresado ningun servicio a pagar");
    }
}

function operacionPagarServicios(servicio, nombreServicio){
    if(validarDatoIngresado(servicio)){
        saldoAnterior = saldoCuenta;
        restarSaldoCuenta(servicio);
        actualizarSaldoEnPantalla();
        alert("Has pagado el servicio de " + nombreServicio + "\nSaldo anterior: $" + saldoAnterior + "\nDinero descontado: $" + servicio + "\nSaldo actual: $" + saldoCuenta);
    }
    else{
        alert("No hay suficiente saldo en tu cuenta para pagar este servicio");                    
    }
}

function transferirDinero() {
    var cuentaAmiga1 = 1234567;
    var cuentaAmiga2 = 7654321;
    var dineroAtransferir = prompt("Ingrese el monto que desea transferir");
    
    if(validarDatoIngresado(dineroAtransferir)){
        if(validacionIsNan(dineroAtransferir)){
            alert("Debe ingresar un monto válido que desea transferir");
        }       
        else if(validacionSaldosNegativos(dineroAtransferir)){
            alert("Es imposible operar con saldos negativos");
        }
        else if(haySaldoDisponible(dineroAtransferir)){
            var cuentaAtransferir = prompt("Ingrese el numero de cuenta al que desea transferir dinero");
            if(validarDatoIngresado(cuentaAtransferir)){
                if(cuentaAtransferir == cuentaAmiga1 || cuentaAtransferir == cuentaAmiga2){
                    restarSaldoCuenta(dineroAtransferir);
                    actualizarSaldoEnPantalla();
                    alert("Se han transferido: $" + dineroAtransferir + "\nCuenta destino: " + cuentaAtransferir);
                }
                else{
                    alert("solo puede transferirse dinero a una cuenta amiga");
                }                
            }
            else{
                alert("Usted no ha ingresado el numero de cuenta al que desea transferir.");
            }           
        }
        else{
            alert("No se puede transferirse esa cantidad de dinero. No hay saldo disponible");
        }   
    }
    else{
        alert("usted no ha ingresado un monto a transferir");
    }
}

function iniciarSesion() {    
    var codigoCuenta = 0000;
    var codigoIngresado = prompt("Ingrese el codigo de su cuenta");
    if(validarDatoIngresado(codigoIngresado)){
        if(validacionIsNan(codigoIngresado)){
            alert("Debe ingresar el código númerico de su cuenta para iniciar sesión");
            saldoCuenta = 0;
            limiteExtraccion = 0;
            actualizarSaldoEnPantalla();
            actualizarLimiteEnPantalla();
        }
        else if(codigoCuenta == codigoIngresado){
            cargarNombreEnPantalla();
            alert("Bienvenido/a " + nombreUsuario);    
        }
        else{
            alert("Código Incorrecto!!! \nTu dinero ha sido retenido por cuestiones de seguridad");     
            saldoCuenta = 0;
            limiteExtraccion = 0;
            actualizarSaldoEnPantalla();
            actualizarLimiteEnPantalla();   
        }
    }
    else{
        alert("Usted no ha ingresado el código númerico de su cuenta para iniciar sesión");
        saldoCuenta = 0;
        limiteExtraccion = 0;
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
    }
}


//funcion extra
function depositosDeCheques(){
    var cuentaDestino = prompt("Ingrese la cuenta destino");  
    if(validarDatoIngresado(cuentaDestino)){
        if(validacionIsNan(cuentaDestino)){
            alert("Debe ingresar el numero de la cuenta destino correcto para proceder con la operación");
        } 
        else{
            var importeCheque = prompt("Ingrese el monto que desea depositar");
            if(validarDatoIngresado(importeCheque)){
                if(validacionIsNan(importeCheque)){
                    alert("Debe ingresar un monto valido a depositar para proceder con la operación");
                }
                else if(validacionSaldosNegativos(importeCheque)){
                    alert("Es imposible operar con saldos negativos");
                }
                else if(haySaldoDisponible(importeCheque)){
                    restarSaldoCuenta(importeCheque);            
                    actualizarSaldoEnPantalla();
                    alert("Titular: " + nombreUsuario + "\nImporte: $" + importeCheque + "\nCuenta destino: N°" + cuentaDestino);
                }
                else{
                    alert("Saldo insuficiente");
                }
            }
            else{
                alert("No ha ingresado el monto que desea depositar");
            }           
        } 
    }
    else{
        alert("Usted no ha ingresado el numero de cuenta");
    }    
}

//funciones para validar que no se opere con saldos negativos, vacios, o con saldo insuficiente.
function validacionSaldosNegativos(dinero){
    if(dinero < 0)
    {       
        return true;
    }
    else{
        return false;
    }
}

function validarDatoIngresado(valor){
    if(valor !== "" && valor !== null){
        return true;
    }else{
        return false;
    }
}

function validacionIsNan(valor){
    if(isNaN(valor)){
        return true;
    }    
    else{
        return false;
    }
}

function haySaldoDisponible(valor)
{
    if(valor > saldoCuenta)
    {
        return false;
    }
    else{
        return true;
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

