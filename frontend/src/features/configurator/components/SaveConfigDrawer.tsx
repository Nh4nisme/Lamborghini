import { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface SaveConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  isLoggedIn: boolean;
  modelTitle: string;
  defaultConfigName: string;
  totalPriceVND: number;
  onSaveAccount: (tenCauHinh: string) => Promise<{ message: string; maChiaSe: string }>;
  onGuestSaveAndSendEmail: (payload: {
    email: string;
    ho: string;
    ten: string;
  }) => Promise<{ message: string; maChiaSe?: string }>;
  onRequestLogin: () => void;
}

export default function SaveConfigDrawer({
  isOpen,
  onClose,
  theme,
  isLoggedIn,
  modelTitle,
  defaultConfigName,
  totalPriceVND,
  onSaveAccount,
  onGuestSaveAndSendEmail,
  onRequestLogin,
}: SaveConfigDrawerProps) {
  const [tenCauHinh, setTenCauHinh] = useState('');
  const [email, setEmail] = useState('');
  const [ho, setHo] = useState('');
  const [ten, setTen] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<{ message: string; maChiaSe?: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTenCauHinh(defaultConfigName);
      setEmail('');
      setHo('');
      setTen('');
      setError('');
      setSuccess(null);
      setCopied(false);
    }
  }, [isOpen, defaultConfigName]);

  if (!isOpen) return null;

  const bgColor = theme === 'dark' ? 'bg-[#191b19]' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-[#343831]' : 'border-gray-300';
  const textColor = theme === 'dark' ? 'text-[#f5f5f1]' : 'text-gray-900';
  const mutedColor = theme === 'dark' ? 'text-[#9ea39b]' : 'text-gray-600';
  const inputBg = theme === 'dark' ? 'bg-[#101110]' : 'bg-gray-50';
  const inputBorder = theme === 'dark' ? 'border-[#343831]' : 'border-gray-300';

  const formatVND = (value: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(value);

  const handleSaveAccount = async () => {
    if (!tenCauHinh.trim()) {
      setError('Configuration name is required');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess(null);
    try {
      const result = await onSaveAccount(tenCauHinh.trim());
      setSuccess(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSave = async () => {
    if (!email.trim() || !ho.trim() || !ten.trim()) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess(null);
    try {
      const result = await onGuestSaveAndSendEmail({
        email: email.trim(),
        ho: ho.trim(),
        ten: ten.trim(),
      });
      setSuccess(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (success?.maChiaSe) {
      navigator.clipboard.writeText(success.maChiaSe);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div
        className={`fixed top-0 right-0 h-full max-w-[420px] w-full ${bgColor} border-l ${borderColor} z-50 flex flex-col`}
      >
        <div className={`flex items-center justify-between p-6 border-b ${borderColor}`}>
          <div>
            <h2 className={`text-sm font-medium ${textColor} mb-1`}>{modelTitle}</h2>
            <p className={`text-xs ${mutedColor}`}>{formatVND(totalPriceVND)}</p>
          </div>
          <button
            onClick={onClose}
            className={`${mutedColor} hover:${textColor} transition-colors`}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {success ? (
            <div className="space-y-4">
              <div className={`p-4 rounded ${inputBg} border ${inputBorder}`}>
                <p className={`text-sm ${textColor} mb-2`}>{success.message}</p>
                {success.maChiaSe && (
                  <div className="flex items-center gap-2 mt-3">
                    <code className={`flex-1 text-xs ${mutedColor} font-mono`}>{success.maChiaSe}</code>
                    <button
                      onClick={handleCopy}
                      className={`p-2 rounded ${inputBg} border ${inputBorder} ${mutedColor} hover:${textColor} transition-colors`}
                      aria-label="Copy share code"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#eac500] text-[#101110] font-medium text-sm tracking-wide hover:bg-[#d4b200] transition-colors"
              >
                CLOSE
              </button>
            </div>
          ) : isLoggedIn ? (
            <div className="space-y-4">
              <div>
                <label className={`block text-xs ${mutedColor} mb-2`}>CONFIGURATION NAME</label>
                <input
                  type="text"
                  value={tenCauHinh}
                  onChange={(e) => setTenCauHinh(e.target.value)}
                  className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} ${textColor} text-sm focus:outline-none focus:border-[#eac500]`}
                  placeholder="Enter configuration name"
                />
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                onClick={handleSaveAccount}
                disabled={loading}
                className="w-full py-3 bg-[#eac500] text-[#101110] font-medium text-sm tracking-wide hover:bg-[#d4b200] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'SAVING...' : 'SAVE CONFIGURATION'}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className={`p-4 rounded ${inputBg} border ${inputBorder}`}>
                <h3 className={`text-sm font-medium ${textColor} mb-2`}>SAVE TO YOUR ACCOUNT</h3>
                <p className={`text-xs ${mutedColor} mb-4`}>
                  Login to save this configuration to your profile and access it anytime.
                </p>
                <button
                  onClick={onRequestLogin}
                  className="w-full py-3 bg-[#eac500] text-[#101110] font-medium text-sm tracking-wide hover:bg-[#d4b200] transition-colors"
                >
                  LOGIN NOW
                </button>
              </div>

              <div className="relative">
                <div className={`absolute inset-0 flex items-center`}>
                  <div className={`w-full border-t ${borderColor}`} />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className={`${bgColor} px-2 ${mutedColor}`}>OR SEND BY E-MAIL</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-xs ${mutedColor} mb-2`}>EMAIL</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} ${textColor} text-sm focus:outline-none focus:border-[#eac500]`}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className={`block text-xs ${mutedColor} mb-2`}>LAST NAME</label>
                  <input
                    type="text"
                    value={ho}
                    onChange={(e) => setHo(e.target.value)}
                    className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} ${textColor} text-sm focus:outline-none focus:border-[#eac500]`}
                    placeholder="Nguyen"
                  />
                </div>
                <div>
                  <label className={`block text-xs ${mutedColor} mb-2`}>FIRST NAME</label>
                  <input
                    type="text"
                    value={ten}
                    onChange={(e) => setTen(e.target.value)}
                    className={`w-full px-3 py-2 ${inputBg} border ${inputBorder} ${textColor} text-sm focus:outline-none focus:border-[#eac500]`}
                    placeholder="Van A"
                  />
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button
                  onClick={handleGuestSave}
                  disabled={loading}
                  className="w-full py-3 bg-[#eac500] text-[#101110] font-medium text-sm tracking-wide hover:bg-[#d4b200] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'SENDING...' : 'CONFIRM AND SEND'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
