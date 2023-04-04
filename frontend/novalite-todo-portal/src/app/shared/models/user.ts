export interface User{
    email: string;
    id: string;
}

export interface UserToken{
    preferred_username: string;
    oid: string;
}

export interface UserAuthorization{
    unique_name: string, //email
    nameid: string,      //id
    role: string,        //role
}

export interface UserTable{
    id: string;
    email: string;
    role: string;
}

export interface UserRolesUpdate{
    id: string;
    role: string;
}

export interface Role {
    value: string;
    viewValue: string;
  }