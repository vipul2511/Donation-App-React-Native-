package com.awesomeproject;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.CallbackManager;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.appevents.AppEventsLogger;
import com.imagepicker.ImagePickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
 
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
   

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
        new FBSDKPackage(mCallbackManager),
            new RNFirebasePackage(),
            new RNFetchBlobPackage(),
            new AsyncStoragePackage(),
            new ImagePickerPackage(),
            new RNGestureHandlerPackage(),
             new RNFirebaseStoragePackage() ,
            new RNFirebaseDatabasePackage(),
            new RNFirebaseAuthPackage()
      );
     
    }
    

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    AppEventsLogger.activateApp(this);
  }
}
