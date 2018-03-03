# ConferenceApp

## Setup
1. `yarn install`
1. inside `ios` run `pod install`
1. Download the `GoogleService-Info.plist` from firebase. Place this in the `ios` directory
1. Download the `google-services.json` from firebase. file and place it inside `android/app`
1. `yarn run ios` or `yarn run android`


## Common Issues
Going to drop issues I ran into more than once here.

### CompileC Failure
#### Issue
```
** BUILD FAILED **


The following build commands failed:

	CompileC /Users/maxfreundlich/workspace/ConferenceApp/ios/build/Build/Intermediates.noindex/React.build/Debug-iphonesimulator/React.build/Objects-normal/x86_64/RCTFrameUpdate.o Base/RCTFrameUpdate.m normal x86_64 objective-c com.apple.compilers.llvm.clang.1_0.compiler
(1 failure)
```
#### Possible Fix
In Xcode, **Product -> Clean**
