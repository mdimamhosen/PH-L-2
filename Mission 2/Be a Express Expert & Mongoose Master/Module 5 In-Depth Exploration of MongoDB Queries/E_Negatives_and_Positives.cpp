#include <bits/stdc++.h>
using namespace std;

int main() {
        int t;
        cin >> t;
        while (t--)
        {
          int n;
            cin >> n;
            vectro<int> a(n);

            for (int i = 0; i < n; i++)
            {
                cin >> a[i];
            }
        long long totalsum = accumulate(a.begin(), a.end(), 0LL);     
        long long maxsum = totalsum;
        for(int i =0; i <n-1; i++){

            int newsum = totalsum;
             newsum = newsum - (a[i] + a[i+1]);
             newsum = newsum + (-a[i]+ -a[i+1]);

            maxsum = max(newsum, maxsum);

        }
        if(totalsum > maxsum) cout << totalsum << endl;
        else cout << maxsum << endl;
        
        }

        

    return 0;
}