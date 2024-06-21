export default class Eye {
    constructor(supabase) {
        this.supabase = supabase;
        this.ipinfoToken = '10999aeaa9913a'; // 10999aeaa9913a
    }

    async ipinfo() {
        try {
            const response = await fetch(`https://ipinfo.io/json?token=${this.ipinfoToken}`);
            if (!response.ok) {
                throw new Error('Failed to fetch IP info');
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error('Error fetching IP info:', e);
            throw e;
        }
    }

    device() {
        const deviceInfo = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screen: {
                width: window.screen.width,
                height: window.screen.height,
                colorDepth: window.screen.colorDepth
            }
        };
        return deviceInfo;
    }

    logger(data) {
        console.log('Logging data:', data);
    }

    async run() {
        try {
            const ipinfoData = await this.ipinfo();
            const deviceData = this.device();
            const combinedData = {
                ...ipinfoData,
                device: deviceData
            };

            this.logger(combinedData);

            const { data, error } = await this.supabase
                .from('access_logs')
                .insert([combinedData]);

            if (error) {
                console.error('Error inserting data into Supabase:', error);
            } else {
                console.log('Data successfully inserted into Supabase:', data);
            }
        } catch (e) {
            console.error('Error running Eye:', e);
        }
    }
}