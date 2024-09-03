import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from '@santander/functions';
/*
 * Get account format OB
 * Usage:
 *   account | AccountObPipe
 * Example:
 *   {{ '122233444444' | accountObPipe}}
 *   formats to: 1-222-3344444-4
 */
@Pipe({ name: 'accountObPipe' })
export class AccountObPipe implements PipeTransform {
  transform(account: string): string {

    
    return isNullOrUndefined(account)
      ? account
      : `${account.substring(0, 1)}-${account.substring(1, 4)}-${account.substring(4, 11)}-${account.substring(11, 12)}`;
  }
}
