#include <locale>
#include <iostream>
#include <Windows.h>

void GetLocaleCountryCode() {
  WCHAR locale_name[LOCALE_NAME_MAX_LENGTH] = {0};

  if (GetLocaleInfoEx(LOCALE_NAME_USER_DEFAULT, LOCALE_SISO3166CTRYNAME,
        (LPWSTR)&locale_name,
        sizeof(locale_name) / sizeof(WCHAR)) ||
      GetLocaleInfoEx(LOCALE_NAME_SYSTEM_DEFAULT, LOCALE_SISO3166CTRYNAME,
        (LPWSTR)&locale_name,
        sizeof(locale_name) / sizeof(WCHAR))) {
  }

  wprintf(L"%s\n", ws);
}

int main() {
  std::cout << "Initial locale: \"" << std::locale().name() << "\"" << std::endl;

  std::string currentLocale = std::setlocale(LC_ALL, nullptr);
  std::string systemLocale = std::setlocale(LC_ALL, "");

  std::setlocale(LC_ALL, currentLocale.c_str());

  std::locale::global(std::locale(systemLocale));

  std::cout << "System locale: \"" << std::locale().name() << "\"" << std::endl;

  GetLocaleCountryCode();

  return 0;
}
