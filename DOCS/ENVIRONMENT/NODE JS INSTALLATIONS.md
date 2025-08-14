
---

# Step 1: Completely Remove All Node.js Installations
Remove NVM and all Node versions:

# Remove all NVM installed Node versions
rm -rf ~/.nvm

# Remove NVM from shell profiles
sed -i '/nvm/d' ~/.bashrc
sed -i '/nvm/d' ~/.zshrc
sed -i '/nvm/d' ~/.profile

---

Remove system-wide Node.js installations:

# Remove Node.js installed via package manager
sudo apt-get remove --purge nodejs npm
sudo apt-get autoremove

# Remove any remaining Node.js files
sudo rm -rf /usr/local/bin/node
sudo rm -rf /usr/local/bin/npm
sudo rm -rf /usr/local/lib/node_modules
sudo rm -rf /usr/local/include/node
sudo rm -rf /opt/node*

# Remove any snap installations
sudo snap remove node

---

Clean up any remaining traces:

# Remove any remaining global npm modules
rm -rf ~/.npm
rm -rf ~/.npm-global

# Clear cache
sudo apt-get clean

---

# Step 2: Install React Native Recommended Node.js Version
React Native currently recommends Node.js 18 LTS. Let's install it via NodeSource (official repository):

# Download and install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show compatible npm version
which node      # Should show /usr/bin/node


# Alternative: If you prefer Node.js 20 LTS
If you want the latest LTS (which is also compatible):

# For Node.js 20 LTS instead
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs


---

# Step 3: Reload Shell and Verify

# Reload your shell
source ~/.bashrc

# Verify Node.js is properly installed
node --version
npm --version
which node

---

# Step 4: Clean and Rebuild Your Project

cd /home/ashok/Documents/TRAINING/RENTIFY/rentify-frontend

# Clear all caches and dependencies
rm -rf node_modules
rm -rf package-lock.json
npm cache clean --force

# Clear React Native cache
npx react-native clean

# Clear Gradle cache
cd android
./gradlew clean
cd ..

# Reinstall dependencies
npm install

# Try building
npx react-native run-android

---

# Verify Everything is Clean
After the installation, run these commands to ensure everything is properly set up:

```bash
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Node path: $(which node)"
echo "NPM path: $(which npm)"
```

---

The output should show:

Node path: /usr/bin/node
NPM path: /usr/bin/npm
Node version: v18.x.x (or v20.x.x if you chose Node 20)

This approach ensures:

✅ React Native compatibility
✅ System-wide availability for Gradle
✅ No path issues
✅ Consistent behavior across different development environments