CONTENT_SCRIPTS = tpe.js tpe.css
MANIFEST = manifest.json
RESOURCES = replacement.json tpe.png TpeFlagFont.tff
ICON_DIR = icons

CHROME_BUILD_DIR = chrome
CHROME_TARGET = chrome.zip

chrome: $(MANIFEST) $(CONTENT_SCRIPTS) $(RESOURCES) $(ICON_DIR)
	mkdir -p $(CHROME_BUILD_DIR)
	cp $(MANIFEST) $(CHROME_BUILD_DIR)
	cp $(CONTENT_SCRIPTS) $(CHROME_BUILD_DIR)
	cp $(RESOURCES) $(CHROME_BUILD_DIR)
	cp -r $(ICON_DIR) $(CHROME_BUILD_DIR)
	zip -r $(CHROME_TARGET) $(CHROME_BUILD_DIR)

clean:
	rm -rf $(CHROME_BUILD_DIR)
	rm -rf $(CHROME_TARGET)
