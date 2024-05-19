import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { globalProperties } from '../page-not-found/globalProperties';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService, SnackbarService, FormBuilder],
})
export class LoginComponent implements OnInit {
  payload: any;
  public loginForm: any = FormGroup;
  responseMessage: any;
  constructor(
    private _userService: UserService,
    private _snackbarService: SnackbarService,
    private _router: Router,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern(globalProperties.emailRegx)],
      ],
      password: ['', Validators.required],
    });
  }
  onLogin() {
    const data = this.loginForm.value;
    this._userService.useLogin(data).subscribe({
      next: (res: any) => {
        const token = res?.token;
        sessionStorage.setItem('token', token);
        this.payload = jwtDecode(token);
        if (this.payload.role && this.payload.role === 'admin') {
          this._router.navigate(['/admin/dashboard']);
        } else {
          this._router.navigate(['/']);
        }
      },
      error: (err: any) => {
        if (err.error?.message) {
          this.responseMessage = err.error?.message;
        } else {
          this.responseMessage = globalProperties.genericError;
        }
        this._snackbarService.openSnckbar(
          this.responseMessage,
          globalProperties.error
        );
      },
    });
  }
}
