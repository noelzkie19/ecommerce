# DNS TXT Record Setup for Facebook Domain Verification

## Domain Details

- **Domain:** triad365.com
- **Registrar:** Vercel
- **TXT Record Value:** `facebook-domain-verification=uz9ne4682xlwy2on87q20yd2cubgyp`

---

## Steps to Add TXT Record in Vercel

### Step 1: Log in to Vercel

1. Go to [vercel.com](https://vercel.com) and log in to your account

### Step 2: Navigate to Domains

1. From your dashboard, click on **Domains** in the left sidebar (or go to Settings → Domains)
2. Find and select **triad365.com** from your domain list

### Step 3: Add DNS Record

1. Scroll down to the **Records** section
2. Click on **Add Record** button
3. Configure the new record with these settings:
   - **Type:** TXT
   - **Name/Host:** `@` (or leave empty - this represents the root domain)
   - **Value:** `facebook-domain-verification=uz9ne4682xlwy2on87q20yd2cubgyp`
   - **TTL:** Default (Auto)

### Step 4: Save the Record

1. Click **Save** to apply the changes

---

## Verify the TXT Record

After saving, verify the record is properly set:

1. **In Vercel:** Check that the TXT record appears in your domain's records list
2. **External DNS Lookup:** Use an online DNS lookup tool:
   - Go to [dnschecker.org](https://dnschecker.org)
   - Enter `triad365.com` and select **TXT**
   - Check if the Facebook verification string appears

---

## Important Notes

1. **Propagation Time:** DNS changes can take 1-48 hours to propagate globally. Wait at least 5-10 minutes after saving before checking.

2. **Root Domain:** Use `@` as the host/name for root domain TXT records (some registrars call it "empty" or "none")

3. **Verification Retry:** After confirming the TXT record is visible in DNS lookups, go back to Facebook Business Manager and click **Verify Domain** again.

4. **If Still Failing:**
   - Double-check the TXT record value matches exactly (no extra spaces or characters)
   - Ensure there are no duplicate TXT records
   - Contact Vercel support if the record doesn't appear in lookups after 24 hours
