import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private matSnackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
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
      this.authService.login(data).subscribe(
        (res) => {
          if (res) {
            this.loading = false;
            const {token} = res
            this.authService.storeToken(token);
            this.matSnackBar.open(
              'Your account has created successfully',
              undefined,
              {
                duration: 2000,
                horizontalPosition: 'center',
              }
            );
          }
        },
        (err) => {
          const { message } = err.error;
          this.loading = false;
          this.matSnackBar.open(
            message ?? 'Something gone wrong try again',
            undefined,
            {
              duration: 2000,
              horizontalPosition: 'center',
            }
          );
        }
      );
    }
  }
}
