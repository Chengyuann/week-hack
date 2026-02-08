import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Spin, message } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import { getVoice, type Voice } from '../api/voices';
import VoiceNFTMint from '../components/VoiceNFTMint';
import { theme } from '../styles/theme';

const VoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [voice, setVoice] = useState<Voice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadVoice();
    }
  }, [id]);

  const loadVoice = async () => {
    setLoading(true);
    try {
      const response = await getVoice(id!);
      if (response.success) {
        setVoice(response.data);
      }
    } catch (error: any) {
      message.error(error.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    message.info('下载功能待实现');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 0' }}>
        <Spin size="large" />
        <div style={{ 
          marginTop: theme.spacing.md, 
          color: theme.colors.mutedText, 
          fontSize: '16px',
          fontFamily: theme.typography.body,
        }}>
          加载中...
        </div>
      </div>
    );
  }

  if (!voice) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 0' }}>
        <div style={{ 
          fontSize: '18px', 
          color: theme.colors.mutedText,
          fontFamily: theme.typography.body,
        }}>角色不存在</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ 
          marginBottom: theme.spacing.lg,
          borderRadius: theme.borderRadius.medium,
          height: '48px',
          fontSize: '15px',
          fontFamily: theme.typography.body,
        }}
      >
        返回
      </Button>

      <Card 
        bordered={false}
        style={{ 
          background: theme.colors.warmWhite,
          borderRadius: theme.borderRadius.large,
          boxShadow: theme.shadows.card,
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: theme.spacing.xxl }}
      >
        <h2 style={{ 
          margin: `0 0 ${theme.spacing.xl} 0`, 
          fontFamily: theme.typography.display,
          fontSize: '32px', 
          fontWeight: 600,
          color: theme.colors.charcoal,
          letterSpacing: '-0.5px',
        }}>
          角色详情
        </h2>

        <div style={{ marginBottom: theme.spacing.xl }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: theme.spacing.lg,
          }}>
            <div>
              <div style={{ 
                fontSize: '13px', 
                color: theme.colors.mutedText, 
                marginBottom: theme.spacing.sm, 
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Voice ID
              </div>
              <div style={{ 
                padding: theme.spacing.md,
                background: `linear-gradient(135deg, ${theme.colors.warmWhite} 0%, ${theme.colors.sage}10 100%)`,
                borderRadius: theme.borderRadius.small,
                fontFamily: theme.typography.mono,
                fontSize: '13px',
                color: theme.colors.charcoal,
                wordBreak: 'break-all',
                border: `1px solid ${theme.colors.sage}20`,
              }}>
                {voice.id}
              </div>
            </div>

            <div>
              <div style={{ 
                fontSize: '13px', 
                color: theme.colors.mutedText, 
                marginBottom: theme.spacing.sm, 
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Step Voice ID
              </div>
              <div style={{ 
                padding: theme.spacing.md,
                background: `linear-gradient(135deg, ${theme.colors.warmWhite} 0%, ${theme.colors.sage}10 100%)`,
                borderRadius: theme.borderRadius.small,
                fontFamily: theme.typography.mono,
                fontSize: '13px',
                color: theme.colors.charcoal,
                wordBreak: 'break-all',
                border: `1px solid ${theme.colors.sage}20`,
              }}>
                {voice.stepVoiceId}
              </div>
            </div>

            <div>
              <div style={{ 
                fontSize: '13px', 
                color: theme.colors.mutedText, 
                marginBottom: theme.spacing.sm, 
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                模型
              </div>
              <div style={{ 
                fontSize: '16px', 
                color: theme.colors.charcoal,
                fontFamily: theme.typography.mono,
                fontWeight: 600,
              }}>
                {voice.model}
              </div>
            </div>

            <div>
              <div style={{ 
                fontSize: '13px', 
                color: theme.colors.mutedText, 
                marginBottom: theme.spacing.sm, 
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Embedding Hash
              </div>
              <div style={{ 
                padding: theme.spacing.md,
                background: `linear-gradient(135deg, ${theme.colors.warmWhite} 0%, ${theme.colors.sage}10 100%)`,
                borderRadius: theme.borderRadius.small,
                fontFamily: theme.typography.mono,
                fontSize: '13px',
                color: theme.colors.charcoal,
                wordBreak: 'break-all',
                border: `1px solid ${theme.colors.sage}20`,
              }}>
                {voice.embeddingHash}
              </div>
            </div>

            <div>
              <div style={{ 
                fontSize: '13px', 
                color: theme.colors.mutedText, 
                marginBottom: theme.spacing.sm, 
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                创建时间
              </div>
              <div style={{ 
                fontSize: '15px', 
                color: theme.colors.charcoal,
                fontFamily: theme.typography.body,
              }}>
                {new Date(voice.createdAt).toLocaleString('zh-CN')}
              </div>
            </div>

            <div>
              <div style={{ 
                fontSize: '13px', 
                color: theme.colors.mutedText, 
                marginBottom: theme.spacing.sm, 
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                更新时间
              </div>
              <div style={{ 
                fontSize: '15px', 
                color: theme.colors.charcoal,
                fontFamily: theme.typography.body,
              }}>
                {new Date(voice.updatedAt).toLocaleString('zh-CN')}
              </div>
            </div>
          </div>

          {voice.text && (
            <div style={{ marginTop: theme.spacing.lg }}>
              <div style={{ 
                fontSize: '13px', 
                color: theme.colors.mutedText, 
                marginBottom: theme.spacing.sm, 
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                音频文本
              </div>
              <div style={{ 
                padding: theme.spacing.md,
                background: `linear-gradient(135deg, ${theme.colors.warmWhite} 0%, ${theme.colors.sage}15 100%)`,
                borderRadius: theme.borderRadius.medium,
                fontSize: '16px',
                color: theme.colors.charcoal,
                lineHeight: '1.7',
                fontFamily: theme.typography.body,
                border: `1px solid ${theme.colors.sage}30`,
              }}>
                {voice.text}
              </div>
            </div>
          )}
        </div>

        {voice.sampleAudioPath && (
          <div style={{ 
            padding: theme.spacing.xl,
            background: `linear-gradient(135deg, ${theme.colors.warmWhite} 0%, ${theme.colors.sage}20 100%)`,
            borderRadius: theme.borderRadius.medium,
            border: `1px solid ${theme.colors.sage}30`,
          }}>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: 600, 
              color: theme.colors.charcoal,
              marginBottom: theme.spacing.md,
              fontFamily: theme.typography.display,
            }}>
              试听音频
            </div>
            <audio controls style={{ 
              width: '100%', 
              height: '48px', 
              marginBottom: theme.spacing.md,
              borderRadius: theme.borderRadius.small,
            }}>
              <source src={voice.sampleAudioPath} type="audio/wav" />
            </audio>
            <Button
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              style={{ 
                borderRadius: theme.borderRadius.small,
                height: '40px',
              }}
            >
              下载音频
            </Button>
          </div>
        )}
      </Card>

      <VoiceNFTMint voiceId={voice.id} embeddingHash={voice.embeddingHash || ""} />
    </div>
  );
};

export default VoiceDetail;



