import { MatDialogConfig } from '@angular/material/dialog';


export function defaultDialogConfig(id?: string, disableClose?: boolean, autoFocus?: boolean , width?: string, height?: string) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = disableClose || false;
  dialogConfig.autoFocus = autoFocus || true;
  dialogConfig.width = width || '800px';
  if(height)
  dialogConfig.height = height;
  if(id)
  dialogConfig.id = id;
  return dialogConfig;
}
