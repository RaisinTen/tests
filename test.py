import os

devnull = os.devnull

print(devnull)
print(os.path.exists(devnull))
print(os.stat(devnull))
