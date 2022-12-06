from seleniumwire import webdriver  # Import from seleniumwire

driver = webdriver.Chrome()

driver.get('https://tawk.to/')

driver.execute_cdp_cmd('Network.enable', {})
t = driver.execute_cdp_cmd('Performance.getMetrics', {})
print(t)
driver.quit()

# for request in driver.requests:
#     if request.response:
#         print(
#             request.url,
#             request.response.status_code,
#             request.response.headers['Content-Type']
#         )