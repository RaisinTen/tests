#include <direct.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
  if (_rmdir("a") == -1) {
    fprintf(stderr,
            "%s failed: errno(%d) = \"%s\", _doserrno = %d\n",
            "_rmdir",
            errno,
            strerror(errno),
            _doserrno);
    exit(EXIT_FAILURE);
  }

  fprintf(stdout,
          "%s succeeded: errno(%d) = \"%s\", _doserrno = %d\n",
          "_rmdir",
          errno,
          strerror(errno),
          _doserrno);

  return 0;
}
