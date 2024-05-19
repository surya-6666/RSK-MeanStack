import { globalProperties } from './../page-not-found/globalProperties';
import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [UserService, SnackbarService],
})
export class RegisterComponent implements OnInit {
  responseMessage: any;
  registerForm: any = FormGroup;
  constructor(
    private _userService: UserService,
    private _fb: FormBuilder,
    private _router: Router,
    private _snackbar: SnackbarService
  ) {}
  ngOnInit(): void {
    this.registerForm = this._fb.group({
      name: [
        '',
        Validators.required,
        Validators.pattern(globalProperties.nameRegx),
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(globalProperties.emailRegx)],
      ],
      password: ['', [Validators.required]],
      phone: [
        '',
        [Validators.required, Validators.pattern(globalProperties.phoneRegex)],
      ],
      apartment: [''],
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
      country: [''],
    });
  }

  onRegister() {
    const data = this.registerForm.value;
    this._userService.userRegister(data).subscribe({
      next: (res: any) => {
        this.responseMessage = res.message;
        this._snackbar.openSnckbar(this.responseMessage, 'success');
        this._router.navigate(['/']);
      },
      error: (err: any) => {
        if (err.error?.message) {
          this.responseMessage = err.error?.message;
        } else {
          this.responseMessage = globalProperties.genericError;
        }
        this._snackbar.openSnckbar(
          this.responseMessage,
          globalProperties.error
        );
      },
    });
  }
}
