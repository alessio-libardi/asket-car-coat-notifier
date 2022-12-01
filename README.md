**Archived**: I've bought the Car Coat.

---

# Asket Car Coat notifier

This is a simple project that checks every hour if the asket car coat is back in stock and notifies me.

It simply uses Playwright to test for the Car Coat color and sizes that I'm interested in and fails if any is available. The tests are run every our by Github Actions that if any workflow fails mails me.
