import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/components/footer/footer.component';
import { SimpleNavComponent } from './components/components/simple-nav/simple-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from './services/ResidentialUser/registration.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { OnboardingComponent } from './components/pages/onboarding/onboarding.component';
import { LoginService } from './services/ResidentialUser/login.service';
import { GooglePlaceModule} from 'ngx-google-places-autocomplete';
import { PasswordChangeEmailComponent } from './components/pages/forgotpass/password-change-email/password-change-email.component';
import { PasswordChangeComponent } from './components/pages/forgotpass/password-change/password-change.component';
import { OnboardingService } from './services/ResidentialUser/onboarding.service';
import { CommunityProfileComponent } from './components/pages/community/community-profile/community-profile.component';
import { CommunityContactsComponent } from './components/pages/community/community-contacts/community-contacts.component';
import { FixedFooterComponent } from './components/components/footer/fixed-footer/fixed-footer.component';
import { SupportComponent } from './components/pages/support/support.component';
import { TokenInterceptor } from './TokenInterceptor';
import { MainNavComponent } from './components/components/main-nav/main-nav.component';
import { CommunityService } from './services/ResidentialUser/community/community.service';
import { ResidentialUserProfileComponent } from './components/pages/residentialProfile/residential-user-profile/residential-user-profile.component';
import { ResidentialUserEditProfileComponent } from './components/pages/residentialProfile/residential-user-edit-profile/residential-user-edit-profile.component';
import { SupportService } from './services/common/support/support.service';
import { ProfileService } from './services/ResidentialUser/profile/profile.service';
import { HomeComponent } from './components/pages/home/home.component';
import { PostsService } from './services/ResidentialUser/posts/posts.service';
import { ChangeCommunityComponent } from './components/pages/change-community/change-community.component';
import { ChangeAddressService } from './services/ResidentialUser/change-address/change-address.service';
import { NotificationMainComponent } from './components/components/notification/notification-main/notification-main.component';
import { SurveyComponent } from './components/pages/survey/survey.component';
import { IndivNotificationComponent } from './components/components/notification/indiv-notification/indiv-notification.component';
import { CommunitySurveyService } from './services/ResidentialUser/communitySurvey/community-survey.service';
import { InterestSurveyService } from './services/ResidentialUser/interestSurvey/interest-survey.service';
import { InterestsComponent } from './components/pages/interests/interests.component';
import { ItemFilterPipe } from './classes/item-filter.pipe';
import { NotificationService } from './services/ResidentialUser/notification/notification.service';
import { ClickOutsideModule } from 'ng-click-outside';
import { ProfilephotoService } from './services/ResidentialUser/profile/profilephoto.service';
import { ToastComponent } from './components/components/toast/toast.component';
import { InviteComponent } from './components/components/invite/invite.component';
import { InviteUserService } from './services/ResidentialUser/inviteUser/invite-user.service';
import { RegisterVendorComponent } from './vendor/components/pages/register-vendor/register-vendor.component';
//Express Sign in
import {SocialAuthServiceConfig,SocialLoginModule} from 'angularx-social-login';

import {GoogleLoginProvider,FacebookLoginProvider} from 'angularx-social-login';
import { ExpressSignINComponent } from './components/components/express-sign-in/express-sign-in.component';
import { LoginVendorComponent } from './vendor/components/pages/login-vendor/login-vendor.component';
import { VendorRegistrationService } from './services/vendor/registration/vendor-registration.service';
import { SimpleNavVendorComponent } from './vendor/components/components/simple-nav-vendor/simple-nav-vendor.component';
import { AddProductComponent } from './vendor/components/pages/add-product/add-product.component';
import { MainNavVendorComponent } from './vendor/components/components/main-nav-vendor/main-nav-vendor.component';
import { PrivacySettingsComponent } from './components/pages/privacy-settings/privacy-settings.component';
import { ViewProfileComponent } from './components/pages/view-profile/view-profile.component';
import { ViewProfileService } from './services/ResidentialUser/viewProfile/view-profile.service';
import { AdminLoginComponent } from './admin/pages/admin-login/admin-login.component';
import { AdminSimpleNavComponent } from './admin/components/navs/admin-simple-nav/admin-simple-nav.component';

import { AdminLoginService } from './services/admin/login/admin-login.service';
import { TestSandBoxComponent } from './components/test-sand-box/test-sand-box.component';

import { AdminMainNavComponent } from './admin/components/navs/admin-main-nav/admin-main-nav.component';
import { AdminHomeComponent } from './admin/pages/admin-home/admin-home.component';
import { FilterCommunityPipe } from './admin/classes/pipes/filter-community.pipe';
import { ViewCommunityComponent } from './admin/pages/view-community/view-community.component';
import { UserListComponent } from './admin/components/user-list/user-list.component';
import { ViewUserComponent } from './admin/pages/view-user/view-user.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { AllComunityServicesService } from './services/admin/allCommunityServices/all-comunity-services.service';
import { PostSelectionComponent } from './components/components/posts/post-selection/post-selection.component';
import { BuildingInfoNewsComponent } from './components/components/posts/News/building-info-news/building-info-news.component';
import { CreateIssuesComponent } from './components/components/posts/Issues/create-issues/create-issues.component';
import { CreateEventsComponent } from './components/components/posts/Events/create-events/create-events.component';
import { ViewEventsComponent } from './components/components/posts/view-events/view-events.component';
import { ViewNewsComponent } from './components/components/posts/view-news/view-news.component';
import { ViewIssuesComponent } from './components/components/posts/view-issues/view-issues.component';
import { HomeVendorComponent } from './vendor/components/pages/home-vendor/home-vendor.component';
import { LoginVendorService } from './services/vendor/loginVendor/login-vendor.service';
import { ProductService } from './services/vendor/Product/product.service';
import { VendorProductPageComponent } from './vendor/components/pages/vendor-product-page/vendor-product-page.component';
import { ViewProfileVendorComponent } from './vendor/components/pages/profile/view-profile-vendor/view-profile-vendor.component';
import { EditProfileVendorComponent } from './vendor/components/pages/profile/edit-profile-vendor/edit-profile-vendor.component';
import { FilterRegionPipe } from './vendor/components/classes/pipes/filterRegion/filter-region.pipe';
import { EditProductComponent } from './vendor/components/pages/edit-product/edit-product.component';
import { MarketHomeComponent } from './components/pages/market/market-home/market-home.component';
import { MarketProductComponent } from './components/pages/market/market-product/market-product.component';
import { MarketService } from './services/ResidentialUser/market/market.service';

import { NguiInviewModule } from '@ngui/common';
import { UserCartComponent } from './components/pages/market/user-cart/user-cart.component';
import { CheckoutComponent } from './components/pages/market/checkout/checkout.component';
import { CartTotalComponent } from './components/components/cart-total/cart-total.component';

import { CreateDealComponent } from './vendor/components/pages/create-deal/create-deal.component';
import { ViewAllDealsComponent } from './vendor/components/pages/view-all-deals/view-all-deals.component';
import { EditDealComponent } from './vendor/components/pages/edit-deal/edit-deal.component';
import { DealsService } from './services/vendor/deals/deals.service';
import { ViewDealVendorComponent } from './vendor/components/pages/view-deal-vendor/view-deal-vendor.component';
import { MarketDealComponent } from './components/pages/market/market-deal/market-deal.component';
import { OrderProcessingResidentialComponent } from './components/pages/market/order-processing-residential/order-processing-residential.component';
import { PaymentCancellationComponent } from './components/pages/market/payment-cancellation/payment-cancellation.component';
import { OrderConfirmedComponent } from './components/pages/market/order-confirmed/order-confirmed.component';
import { OrdersComponent } from './components/pages/market/orders/orders.component';
import { OrderIndividualComponent } from './components/pages/market/order-individual/order-individual.component';
import { FilterViaDatePipe } from './classes/filter-via-date.pipe';
import { VendorOrdersComponent } from './vendor/components/pages/vendor-orders/vendor-orders.component';
import { OrdersService } from './services/vendor/orders/orders.service';
import { ViewOrderVendorComponent } from './vendor/components/pages/view-order-vendor/view-order-vendor.component';
import { GetVariantPipe } from './classes/get-variant.pipe';
import { ActivateComponent } from './components/pages/activate/activate.component';
import { ProcessDealComponent } from './components/pages/market/process-deal/process-deal.component';
import { VendorProfileForUsersComponent } from './components/pages/market/vendor-profile-for-users/vendor-profile-for-users.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { VerifyVendorAccountComponent } from './vendor/components/pages/verify-vendor-account/verify-vendor-account.component';
import { environment } from 'src/environments/environment';
import { NavOptionsComponent } from './components/components/nav-options/nav-options.component';
import { GeneralBackgroundComponent } from './components/components/general-background/general-background.component';
import { ProfilePictureChangeComponent } from './components/components/profile-picture-change/profile-picture-change.component';
import { VendorNavOptionsComponent } from './vendor/components/components/vendor-nav-options/vendor-nav-options.component';
import { ProductSearchPipe } from './vendor/components/classes/pipes/product-search.pipe';
import { DealSearchPipe } from './vendor/components/classes/pipes/deal-search.pipe';
import { CalculatorComponent } from './vendor/components/pages/calculator/calculator.component';
import { CalculatorService } from './services/vendor/calculator/calculator.service';
import { OfferNoticeComponent } from './vendor/components/components/offer-notice/offer-notice.component';
import { FilterProductPipe } from './vendor/components/classes/pipes/filter-order/filter-product.pipe';
import { ViewDealPostComponent } from './components/components/posts/view-deal-post/view-deal-post.component';
import { ForgotPasswordComponent } from './vendor/components/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './vendor/components/pages/reset-password/reset-password.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
////////////
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WalletToolboxComponent } from './components/components/wallet-toolbox/wallet-toolbox.component';
import { WalletComponent } from './components/pages/wallet/wallet.component';

//////////////////
import { CommunityMemberRegComponent } from './components/pages/community-member-reg/community-member-reg.component';
import { AuthModule } from '@auth0/auth0-angular';
import { CommunityMemberRegService } from 'src/app/services/ResidentialUser/communityMemberReg/community-member-reg.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    SimpleNavComponent,
    OnboardingComponent,
    PasswordChangeEmailComponent,
    PasswordChangeComponent,
    CommunityProfileComponent,
    CommunityContactsComponent,
    FixedFooterComponent,
    MainNavComponent,
    SupportComponent,
    ResidentialUserProfileComponent,
    ResidentialUserEditProfileComponent,
    HomeComponent,
    ChangeCommunityComponent,
    NotificationMainComponent,
    SurveyComponent,
    IndivNotificationComponent,
    InterestsComponent,
    ItemFilterPipe,
    ToastComponent,
    InviteComponent,
    ExpressSignINComponent,
    RegisterVendorComponent,
    LoginVendorComponent,
    SimpleNavVendorComponent,
    AddProductComponent,
    MainNavVendorComponent,
    PrivacySettingsComponent,
    ViewProfileComponent,
    AdminLoginComponent,
    AdminSimpleNavComponent,
    AdminMainNavComponent,
    AdminHomeComponent,
    FilterCommunityPipe,
    ViewCommunityComponent,
    UserListComponent,
    ViewUserComponent,
    PostSelectionComponent,
    BuildingInfoNewsComponent,
    CreateIssuesComponent,
    CreateEventsComponent,
    ViewEventsComponent,
    ViewNewsComponent,
    ViewIssuesComponent,
    HomeVendorComponent,
    VendorProductPageComponent,
    ViewProfileVendorComponent,
    EditProfileVendorComponent,
    FilterRegionPipe,
    EditProductComponent,
    MarketHomeComponent,
    MarketProductComponent,
    UserCartComponent,
    CheckoutComponent,
    CartTotalComponent,
    CreateDealComponent,
    ViewAllDealsComponent,
    EditDealComponent,
    ViewDealVendorComponent,
    MarketDealComponent,
    OrderProcessingResidentialComponent,
    PaymentCancellationComponent,
    OrderConfirmedComponent,
    OrdersComponent,
    OrderIndividualComponent,
    FilterViaDatePipe,
    VendorOrdersComponent,
    ViewOrderVendorComponent,
    GetVariantPipe,
    ActivateComponent,
    ProcessDealComponent,
    VendorProfileForUsersComponent,
    NotfoundComponent,
    VerifyVendorAccountComponent,
    NavOptionsComponent,
    GeneralBackgroundComponent,
    TestSandBoxComponent,
    ProfilePictureChangeComponent,
    VendorNavOptionsComponent,
    ProductSearchPipe,
    DealSearchPipe,
    CalculatorComponent,
    OfferNoticeComponent,
    FilterProductPipe,
    ViewDealPostComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    WalletToolboxComponent,
    WalletComponent,
    /////////////////////
    CommunityMemberRegComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GooglePlaceModule,
    ScrollingModule,
    ClickOutsideModule,
    SocialLoginModule,
    NgxPaginationModule,
    NguiInviewModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,

    //////
    AuthModule.forRoot({
      domain: 'naborinoauth0@gmail.com',
      clientId: 'F$?Yx1U&A4Y^'
    }),
    
    AppRoutingModule // Add this line

  ],

  providers: [RegistrationService,HttpClient,LoginService,OnboardingService,CommunityService,AppComponent,SupportService,ProfileService,PostsService,ChangeAddressService,
  CommunitySurveyService,InterestSurveyService,NotificationService,ProfilephotoService,InviteUserService,ViewProfileService,MarketService, DatePipe,

  //Vendor Services
    VendorRegistrationService,
    LoginVendorService,
    ProductService,
    DealsService,
    OrdersService,
    CalculatorService,


    //admin Services
    AdminLoginService,
    AllComunityServicesService,

    //Community Member Reg Service
    CommunityMemberRegService,

    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    },
    {
      provide : 'SocialAuthServiceConfig',
      useValue:{
        autoLogin:false,
        providers:[
          {
            id:GoogleLoginProvider.PROVIDER_ID,
            provider : new GoogleLoginProvider(`${environment.GOOGLE_LOGIN_PROVIDER}`)
          },
          {
            id:FacebookLoginProvider.PROVIDER_ID,
            provider : new FacebookLoginProvider(`${environment.FACEBOOK_LOGIN_PROVIDER}`)
          }
        ],
        onError:(err)=>{
          console.log(err);
        }
      } as SocialAuthServiceConfig,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
