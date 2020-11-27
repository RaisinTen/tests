#define _FILE_OFFSET_BITS 64

#include <cerrno>
#include <cstdio>
#include <cstring>

#include <fcntl.h>

#include <sys/stat.h>
#include <sys/types.h>
#include <sys/uio.h>

#include <unistd.h>

int main(int argc, char* argv[])
{
    constexpr size_t BUF_SIZE{1024};
    char buf[BUF_SIZE];

    struct iovec iov[1];
    iov[0].iov_base = buf;
    iov[0].iov_len = BUF_SIZE;

    const int fd{open(__FILE__, O_RDONLY)};
    constexpr off_t offset{0x7FFF'FFFF'FFFF'FBFF + 1ll};

    preadv2(fd, iov, 1, offset, 0);
    close(fd);

    puts(strerror(errno));

    return 0;
}
