import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function invalidPasswordMatching(control : AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirm = control.get('confirmPassword')?.value;
        //invalid
        return (password && confirm && password !== confirm) ? {invalidPasswordMatch: true} : null;
    
}