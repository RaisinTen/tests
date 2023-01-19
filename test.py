import os

devnull = os.devnull

print('hello')
print(devnull)
print(os.path.exists(devnull))
print(os.stat(devnull))
