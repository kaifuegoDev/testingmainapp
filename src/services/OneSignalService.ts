import { Capacitor } from '@capacitor/core';

const ONESIGNAL_APP_ID = 'accd52e6-28ee-4a2b-b1dc-e46f39be871e';

class OneSignalService {
  private static instance: OneSignalService;
  private initialized: boolean = false;
  private OneSignal: any = null;

  private constructor() { }

  public static getInstance(): OneSignalService {
    if (!OneSignalService.instance) {
      OneSignalService.instance = new OneSignalService();
    }
    return OneSignalService.instance;
  }

  private async getSDK() {
    if (this.OneSignal) return this.OneSignal;
    if (!Capacitor.isNativePlatform()) return null;
    
    try {
      // Dynamic import to avoid build errors
      const sdk = await import('onesignal-cordova-plugin');
      this.OneSignal = sdk.default || sdk;
      return this.OneSignal;
    } catch (e) {
      console.error('OneSignal: Failed to load SDK', e);
      return null;
    }
  }

  /**
   * OneSignal SDK ko initialize karta hai
   */
  public async initialize() {
    if (this.initialized) return;

    if (!Capacitor.isNativePlatform()) {
      console.log('OneSignal: Native platform nahi hai, initialization skip kar rahe hain.');
      return;
    }

    const sdk = await this.getSDK();
    if (!sdk) return;

    try {
      // OneSignal initialization
      sdk.initialize(ONESIGNAL_APP_ID);

      // Notification permission maangein
      sdk.Notifications.requestPermission(true).then((success: boolean) => {
        console.log('OneSignal: Notification permission status:', success);
      });

      // Notification click handler
      sdk.Notifications.addEventListener('click', (event: any) => {
        console.log('OneSignal: Notification clicked:', event);
      });

      // Foreground notification handler
      sdk.Notifications.addEventListener('foregroundWillDisplay', (event: any) => {
        console.log('OneSignal: Notification foreground will display:', event);
      });

      this.initialized = true;
      console.log('OneSignal: SDK initialized successfully.');
    } catch (error) {
      console.error('OneSignal: Initialization error:', error);
    }
  }

  /**
   * User ID set karne ke liye (Analytics aur targeting ke liye)
   */
  public async setExternalUserId(userId: string) {
    const sdk = await this.getSDK();
    if (!sdk) return;

    sdk.login(userId);
    console.log(`OneSignal: User logged in with ID: ${userId}`);
  }

  /**
   * User ko logout karne ke liye
   */
  public async logout() {
    const sdk = await this.getSDK();
    if (!sdk) return;

    sdk.logout();
    console.log('OneSignal: User logged out');
  }

  /**
   * Tags add karne ke liye
   */
  public async sendTags(tags: { [key: string]: string }) {
    const sdk = await this.getSDK();
    if (!sdk) return;

    sdk.User.addTags(tags);
    console.log('OneSignal: Tags sent:', tags);
  }
}

export default OneSignalService.getInstance();
