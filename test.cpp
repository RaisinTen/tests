#include <locale>
#include <iostream>

int main() {
  std::cout << "Initial locale: \"" << std::locale().name() << "\"" << std::endl;

  std::locale::global(std::locale(""));

  std::cout << "System locale: \"" << std::locale().name() << "\"" << std::endl;

  return 0;
}
