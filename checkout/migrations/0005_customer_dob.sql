-- Optional field already offered by the reading inquiry form. Never required for checkout.
ALTER TABLE orders ADD COLUMN customer_dob TEXT;
