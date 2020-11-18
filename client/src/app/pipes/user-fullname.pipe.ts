import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class UserFullnamePipe implements PipeTransform {

  transform(user: any): any {
    return user.firstName + ' ' + user.lastName;
  }

}
