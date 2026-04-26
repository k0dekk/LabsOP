# Lab 5
## Async Array Function Variants

### Run
node main.js

### Example output
```text
start promise / async-await

testing taken:
[db] check username='newUser99' | taken=false (442ms)
[db] check email='test@test.com' | taken=true (789ms)
-> result: validation failed

testing free:
[db] check username='super_sanco' | taken=false (768ms)
[db] check email='brand.new@mail.com' | taken=false (634ms)
-> result: ok

start callback version
[db] check username='newUser99' | taken=false (442ms)
[db] check email='test@test.com' | taken=true (672ms)
-> result: validation failed

start abort controller test
[db] check username='newUser99' | taken=false (472ms)
timeout 500ms reached. calling abort()...
catch: AbortError (iteration stopped)