**Rin Library Documentation**
**Introduction**
Welcome to the Rin Library, a comprehensive React-Native Expo UI Library designed to enhance your mobile and web app development experience. This library offers a collection of customizable components, ensuring seamless integration and a consistent user interface across iOS, Android, and Web platforms.

**Components**
**1. Rin DateTime Picker Input**

![image](https://github.com/usamaH-dotdev/rinlibrary/assets/126305135/821d1a8f-936a-4dae-affd-5fe4360fd208)

*import { RinDateTimePickerInput } from 'rin-library';

<RinDateTimePickerInput onChange={handleDateChange} />;
Props
onChange: Callback function triggered on date/time selection.

**2. Rin DateTime Picker Input 2**

![image](https://github.com/usamaH-dotdev/rinlibrary/assets/126305135/8dea5173-6f31-4aab-b981-e51f8f35a49a)

*import { RinDateTimePickerInput2 } from 'rin-library';

<RinDateTimePickerInput2 onChange={handleDateChange} />;
Props
onChange: Callback function triggered on date/time selection.

**3. Rin Cards**

![image](https://github.com/usamaH-dotdev/rinlibrary/assets/126305135/b35dacd5-1c81-4ba9-8cc3-de2c31cea1ed)

*import { RinCards } from 'rin-library';

<RinCards items={cardItems} />;
Props
items: An array of objects representing card content.

**4. Rin Input Fields**

![image](https://github.com/usamaH-dotdev/rinlibrary/assets/126305135/e8eee147-f846-4acb-bff5-9ecd17aedd73)

*import { RinInputFields } from 'rin-library';

<RinInputFields onSubmit={handleSubmit} />;
Props
onSubmit: Callback function triggered on form submission.

**5. Rin CheckBox & Toggler**

![image](https://github.com/usamaH-dotdev/rinlibrary/assets/126305135/2eac140f-b7d2-4f03-9467-2a8a7998bc49)

*import { RinCheckBoxAndToggler } from 'rin-library';

<RinCheckBoxAndToggler onChange={handleToggleChange} />;
Props
onChange: Callback function triggered on checkbox or toggler state change.

**6. Rin Calendar**

![image](https://github.com/usamaH-dotdev/rinlibrary/assets/126305135/3176a8e0-7077-4c69-86d8-b37912436dc2)

import { RinCalendar } from 'rin-library';

<RinCalendar onSelectDate={handleDateSelection} />;
Props
onSelectDate: Callback function triggered on calendar date selection.

**Customization**
All Rin Library components support extensive customization. You can modify styles, colors, and behavior to align with your app's unique design and requirements.

**Styling Example**

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  dateTimePicker: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
  },
});

<RinDateTimePickerInput style={styles.dateTimePicker} />;
Platform Support
Rin Library components are compatible with iOS, Android, and Web platforms out of the box. You can seamlessly integrate them into your multi-platform projects.

*import { RinDateTimePickerInput, RinCards, RinInputFields } from 'rin-library';

// Components can be used across all platforms without modification
**Conclusion**
With Rin Library, you have a powerful set of components at your disposal, designed to streamline your development process and provide a consistent user experience. Explore customization options, leverage the library's versatility, and enjoy a simplified development journey across diverse platforms.

