import { LoginData, PE68Response, Userinfo } from './OBUser/ob-user.model';
import { UuidUserModel } from './OBUser/uuid-user.model';
import { OauthTokenModel } from './session.model';

export class ContextModel {
  public listUserInfo?: UserInfoModel[];
  public oauth: OauthTokenModel;
  public login: LoginData;
  public uuid: UuidUserModel;
  constructor(
    oauth: OauthTokenModel,
    login: LoginData,
    uuid: UuidUserModel,
    listUserInfo?: UserInfoModel[]
  ) {
    this.listUserInfo = listUserInfo;
    this.oauth = oauth;
    this.uuid = uuid;
    this.login = login;
  }
}

export class UserInfoModel implements Userinfo {
  public codHalfSafety = '';
  public codKindAuthorization = '';
  public flgSexMale = '';
  public glsMailOb = '';
  public glsNameUserEx = '';
  public glsSurMatUserExt = '';
  public glsSurPatUserExt = '';
  public namUserEtcdo = '';
  public numUserExtOb = '';
}

export class UserModel {
  public firstName = '';
  public matLastName = '';
  public patLastName = '';
  public fullName = '';
  public nameInitials = '';
  public rut = '';

  public codHalfSafety = '';
  public kindAuthorization = 'null';
  public flgSexMale? = '';
  public mailOb? = '';

  // public PE68?: PE68Response;
  public numper?: string;

  constructor(userInfo?: UserInfoModel) {
    if (userInfo) {
      this.firstName = userInfo.glsNameUserEx.trim();
      this.matLastName = userInfo.glsSurMatUserExt.trim();
      this.patLastName = userInfo.glsSurPatUserExt.trim();
      this.fullName = userInfo.namUserEtcdo.trim();
      this.nameInitials = this.getNameInitials(
        this.firstName,
        this.patLastName
      );
      this.rut = userInfo.numUserExtOb.trim();

      this.codHalfSafety = userInfo.codHalfSafety.trim();
      this.kindAuthorization = userInfo.codKindAuthorization.trim();
      this.flgSexMale = userInfo.flgSexMale ? userInfo.flgSexMale.trim() : '';
      this.mailOb = userInfo.glsMailOb ? userInfo.glsMailOb.trim() : '';
    }
  }

  private getNameInitials(name: string, lastName: string) {
    const siglaNom = name.charAt(0);
    const siglaApe = lastName.charAt(0);
    return siglaNom + siglaApe;
  }
}

export class ResponseUserInfoModel {
  public listUserInfo: UserInfoModel[];
  constructor(listUserInfo: UserInfoModel[]) {
    this.listUserInfo = listUserInfo;
  }
}
