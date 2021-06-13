#include <locale>
#include <iostream>

int main() {
  std::cout << "Initial locale: \"" << std::locale().name() << "\"" << std::endl;

  std::string currentLocale = std::setlocale(LC_ALL, nullptr);
  std::string systemLocale = std::setlocale(LC_ALL, "");

  std::setlocale(LC_ALL, currentLocale.c_str());

  std::locale::global(std::locale(systemLocale));

  std::cout << "System locale: \"" << std::locale().name() << "\"" << std::endl;

  return 0;
}
