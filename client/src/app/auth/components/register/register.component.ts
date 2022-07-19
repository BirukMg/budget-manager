import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private matSnackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        username: this.form.get('username')!.value,
        password: this.form.get('password')!.value,
      };
      this.authService.register(data).subscribe((res) => {
        if (res) {
          this.loading = false;
          this.formGroupDirective.resetForm();
          this.matSnackBar.open('Your account has created successfully', undefined, {
            duration: 2000,
            horizontalPosition: 'center',
          });
        } 
      }, err => {
        const {message} = err.error;
        this.loading = false
        this.matSnackBar.open(message ?? 'Something gone wrong try again', undefined, {
          duration: 2000,
          horizontalPosition: 'center',
        });
      });
    }
  }
}
