#include <Windows.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
  // Refs: https://referencesource.microsoft.com/#mscorlib/system/environment.cs,1506
  char start_menu_folder_path[MAX_PATH];
  int result = SHGetFolderPathA(
      0,
      CSIDL_STARTMENU,
      0,
      SHGFP_TYPE_CURRENT,
      start_menu_folder_path);

  if (result == S_OK) {
    // Success case, so print the start menu folder path.
    printf("Start menu folder path: \"%s\"\n", start_menu_folder_path);
  } else {
    // Error case, so print the error.
    printf("Error code: %d\n", result);
  }

  return 0;
}
